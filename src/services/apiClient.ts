import { apiConfig, isRealAPIEnabled, isCachingEnabled } from '../config/apiConfig';
import { rateLimiter } from '../utils/rateLimiter';
import { apiCache } from '../utils/cache';

export interface APIResponse<T> {
  data: T;
  success: boolean;
  error?: string;
  cached?: boolean;
  rateLimit?: {
    remaining: number;
    reset: number;
  };
}

class APIClient {
  private async makeRequest<T>(
    url: string,
    options: RequestInit = {},
    apiName: string,
    cacheKey?: string
  ): Promise<APIResponse<T>> {
    try {
      // Check cache first
      if (isCachingEnabled && cacheKey && apiCache.has(cacheKey)) {
        const cachedData = apiCache.get<T>(cacheKey);
        if (cachedData) {
          return {
            data: cachedData,
            success: true,
            cached: true
          };
        }
      }

      // Apply rate limiting
      const config = apiConfig[apiName as keyof typeof apiConfig];
      if (config) {
        await rateLimiter.checkLimit(apiName, config.rateLimit);
      }

      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'OSINT-Toolkit/2.0',
          ...options.headers
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      // Cache the response
      if (isCachingEnabled && cacheKey) {
        apiCache.set(cacheKey, data);
      }

      return {
        data,
        success: true,
        cached: false,
        rateLimit: {
          remaining: parseInt(response.headers.get('X-RateLimit-Remaining') || '0'),
          reset: parseInt(response.headers.get('X-RateLimit-Reset') || '0')
        }
      };

    } catch (error) {
      console.error(`API Error (${apiName}):`, error);
      return {
        data: {} as T,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  // Have I Been Pwned API
  async checkBreaches(email: string): Promise<APIResponse<any[]>> {
    if (!isRealAPIEnabled || !apiConfig.haveIBeenPwned.apiKey) {
      throw new Error('HaveIBeenPwned API key not configured');
    }

    const cacheKey = apiCache.generateKey('hibp-breaches', { email });
    const url = `${apiConfig.haveIBeenPwned.baseUrl}/breachedaccount/${encodeURIComponent(email)}`;
    
    return this.makeRequest<any[]>(url, {
      headers: {
        'hibp-api-key': apiConfig.haveIBeenPwned.apiKey
      }
    }, 'haveIBeenPwned', cacheKey);
  }

  // VirusTotal API
  async scanDomain(domain: string): Promise<APIResponse<any>> {
    if (!isRealAPIEnabled || !apiConfig.virusTotal.apiKey) {
      throw new Error('VirusTotal API key not configured');
    }

    const cacheKey = apiCache.generateKey('vt-domain', { domain });
    const url = `${apiConfig.virusTotal.baseUrl}/domain/report`;
    
    return this.makeRequest<any>(url, {
      method: 'POST',
      body: new URLSearchParams({
        apikey: apiConfig.virusTotal.apiKey,
        domain: domain
      })
    }, 'virusTotal', cacheKey);
  }

  // Shodan API
  async searchHost(query: string): Promise<APIResponse<any>> {
    if (!isRealAPIEnabled || !apiConfig.shodan.apiKey) {
      throw new Error('Shodan API key not configured');
    }

    const cacheKey = apiCache.generateKey('shodan-host', { query });
    const url = `${apiConfig.shodan.baseUrl}/shodan/host/search?key=${apiConfig.shodan.apiKey}&query=${encodeURIComponent(query)}`;
    
    return this.makeRequest<any>(url, {}, 'shodan', cacheKey);
  }

  // AbuseIPDB API
  async checkIP(ip: string): Promise<APIResponse<any>> {
    if (!isRealAPIEnabled || !apiConfig.abuseIPDB.apiKey) {
      throw new Error('AbuseIPDB API key not configured');
    }

    const cacheKey = apiCache.generateKey('abuseipdb', { ip });
    const url = `${apiConfig.abuseIPDB.baseUrl}/check`;
    
    return this.makeRequest<any>(url, {
      method: 'GET',
      headers: {
        'Key': apiConfig.abuseIPDB.apiKey,
        'Accept': 'application/json'
      }
    }, 'abuseIPDB', cacheKey);
  }

  // IPInfo API
  async getIPInfo(ip: string): Promise<APIResponse<any>> {
    if (!isRealAPIEnabled || !apiConfig.ipInfo.token) {
      throw new Error('IPInfo token not configured');
    }

    const cacheKey = apiCache.generateKey('ipinfo', { ip });
    const url = `${apiConfig.ipInfo.baseUrl}/${ip}?token=${apiConfig.ipInfo.token}`;
    
    return this.makeRequest<any>(url, {}, 'ipInfo', cacheKey);
  }

  // WHOIS XML API
  async getWhoisData(domain: string): Promise<APIResponse<any>> {
    if (!isRealAPIEnabled || !apiConfig.whoisXML.apiKey) {
      throw new Error('WhoisXML API key not configured');
    }

    const cacheKey = apiCache.generateKey('whoisxml', { domain });
    const url = `${apiConfig.whoisXML.baseUrl}?apiKey=${apiConfig.whoisXML.apiKey}&domainName=${domain}&outputFormat=JSON`;
    
    return this.makeRequest<any>(url, {}, 'whoisXML', cacheKey);
  }

  // EmailRep API
  async getEmailReputation(email: string): Promise<APIResponse<any>> {
    const cacheKey = apiCache.generateKey('emailrep', { email });
    const url = `${apiConfig.emailRep.baseUrl}/${encodeURIComponent(email)}`;
    
    const headers: Record<string, string> = {};
    if (apiConfig.emailRep.apiKey) {
      headers['Key'] = apiConfig.emailRep.apiKey;
    }
    
    return this.makeRequest<any>(url, { headers }, 'emailRep', cacheKey);
  }
}

export const apiClient = new APIClient();