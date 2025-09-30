export interface APIConfig {
  haveIBeenPwned: {
    baseUrl: string;
    apiKey?: string;
    rateLimit: number;
  };
  virusTotal: {
    baseUrl: string;
    apiKey?: string;
    rateLimit: number;
  };
  shodan: {
    baseUrl: string;
    apiKey?: string;
    rateLimit: number;
  };
  abuseIPDB: {
    baseUrl: string;
    apiKey?: string;
    rateLimit: number;
  };
  ipInfo: {
    baseUrl: string;
    token?: string;
    rateLimit: number;
  };
  whoisXML: {
    baseUrl: string;
    apiKey?: string;
    rateLimit: number;
  };
  emailRep: {
    baseUrl: string;
    apiKey?: string;
    rateLimit: number;
  };
}

export const apiConfig: APIConfig = {
  haveIBeenPwned: {
    baseUrl: 'https://haveibeenpwned.com/api/v3',
    apiKey: import.meta.env.VITE_HAVEIBEENPWNED_API_KEY,
    rateLimit: 1500 // ms between requests
  },
  virusTotal: {
    baseUrl: 'https://www.virustotal.com/vtapi/v2',
    apiKey: import.meta.env.VITE_VIRUSTOTAL_API_KEY,
    rateLimit: 15000 // 15 seconds for free tier
  },
  shodan: {
    baseUrl: 'https://api.shodan.io',
    apiKey: import.meta.env.VITE_SHODAN_API_KEY,
    rateLimit: 1000
  },
  abuseIPDB: {
    baseUrl: 'https://api.abuseipdb.com/api/v2',
    apiKey: import.meta.env.VITE_ABUSEIPDB_API_KEY,
    rateLimit: 1000
  },
  ipInfo: {
    baseUrl: 'https://ipinfo.io',
    token: import.meta.env.VITE_IPINFO_TOKEN,
    rateLimit: 1000
  },
  whoisXML: {
    baseUrl: 'https://www.whoisxmlapi.com/whoisserver/WhoisService',
    apiKey: import.meta.env.VITE_WHOISXML_API_KEY,
    rateLimit: 1000
  },
  emailRep: {
    baseUrl: 'https://emailrep.io',
    apiKey: import.meta.env.VITE_EMAILREP_API_KEY,
    rateLimit: 1000
  }
};

export const isRealAPIEnabled = import.meta.env.VITE_ENABLE_REAL_APIS === 'true';
export const isCachingEnabled = import.meta.env.VITE_ENABLE_CACHING === 'true';
export const cacheDurationHours = parseInt(import.meta.env.VITE_CACHE_DURATION_HOURS || '2');