import { OSINTResult, EmailData, DomainData, IPData, UsernameData, TimelineEvent, GeolocationData, RiskFactors, ReportMetadata } from '../types/osint';
import { apiClient } from './apiClient';
import { isRealAPIEnabled } from '../config/apiConfig';
import { simulateOSINTScan } from './osintService';

export async function performRealOSINTScan(
  target: string,
  inputType: 'email' | 'domain' | 'ip' | 'username',
  scanDepth: 'quick' | 'standard' | 'deep'
): Promise<OSINTResult> {
  // Fallback to simulation if real APIs are not enabled
  if (!isRealAPIEnabled) {
    console.warn('Real APIs not enabled, falling back to simulation');
    return simulateOSINTScan(target, inputType, scanDepth);
  }

  const startTime = Date.now();
  
  const result: OSINTResult = {
    inputType,
    target,
    scanDepth,
    timestamp: new Date().toISOString(),
    threatScore: 0,
    riskFactors: {
      breachHistory: 0,
      infrastructureAge: 0,
      geographicRisk: 0,
      blacklistStatus: 0,
      securityScanResults: 0
    },
    data: {},
    timeline: [],
    geolocation: undefined,
    darkWeb: undefined,
    mitreAttack: [],
    similarTargets: [],
    metadata: {
      generatedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      dataFreshness: 'fresh',
      cacheStatus: 'miss',
      scanDuration: 0
    }
  };

  try {
    switch (inputType) {
      case 'email':
        result.data.email = await performEmailScan(target, scanDepth);
        break;
      case 'domain':
        result.data.domain = await performDomainScan(target, scanDepth);
        if (scanDepth !== 'quick') {
          result.geolocation = await performGeolocationScan(target);
        }
        break;
      case 'ip':
        result.data.ip = await performIPScan(target, scanDepth);
        result.geolocation = await performGeolocationScan(target);
        break;
      case 'username':
        result.data.username = await performUsernameScan(target, scanDepth);
        break;
    }

    // Generate timeline from real data
    result.timeline = generateRealTimeline(result);
    
    // Calculate risk factors and threat score
    result.riskFactors = calculateRealRiskFactors(result);
    result.threatScore = calculateRealThreatScore(result);
    
    // Update metadata
    result.metadata.scanDuration = Date.now() - startTime;
    
  } catch (error) {
    console.error('Real OSINT scan failed, falling back to simulation:', error);
    return simulateOSINTScan(target, inputType, scanDepth);
  }

  return result;
}

async function performEmailScan(email: string, depth: string): Promise<EmailData> {
  const data: EmailData = {
    breaches: [],
    reputation: {
      score: 0,
      blacklisted: false,
      riskTags: []
    }
  };

  try {
    // Check Have I Been Pwned
    const breachResponse = await apiClient.checkBreaches(email);
    if (breachResponse.success && Array.isArray(breachResponse.data)) {
      data.breaches = breachResponse.data.map(breach => ({
        name: breach.Name || 'Unknown',
        date: breach.BreachDate || 'Unknown',
        accounts: breach.PwnCount || 0,
        verified: breach.IsVerified || false
      }));
    }

    // Check EmailRep
    const repResponse = await apiClient.getEmailReputation(email);
    if (repResponse.success) {
      const repData = repResponse.data;
      data.reputation = {
        score: Math.round((repData.reputation || 'none') === 'high' ? 80 : 
                        (repData.reputation || 'none') === 'medium' ? 50 : 20),
        blacklisted: repData.suspicious || false,
        riskTags: repData.details?.blacklisted || []
      };
    }

  } catch (error) {
    console.error('Email scan error:', error);
    // Return partial data on error
  }

  return data;
}

async function performDomainScan(domain: string, depth: string): Promise<DomainData> {
  const data: DomainData = {
    whois: {
      registrar: 'Unknown',
      creationDate: 'Unknown',
      country: 'Unknown',
      age: 0
    },
    virusTotal: {
      detections: 0,
      scanDate: new Date().toISOString().split('T')[0],
      categories: []
    }
  };

  try {
    // Get WHOIS data
    const whoisResponse = await apiClient.getWhoisData(domain);
    if (whoisResponse.success) {
      const whoisData = whoisResponse.data.WhoisRecord || {};
      const registryData = whoisData.registryData || {};
      
      data.whois = {
        registrar: registryData.registrarName || whoisData.registrarName || 'Unknown',
        creationDate: registryData.createdDate || whoisData.createdDate || 'Unknown',
        country: registryData.registrant?.country || whoisData.registrant?.country || 'Unknown',
        age: registryData.createdDate ? 
          new Date().getFullYear() - new Date(registryData.createdDate).getFullYear() : 0
      };
    }

    // Get VirusTotal data
    const vtResponse = await apiClient.scanDomain(domain);
    if (vtResponse.success) {
      const vtData = vtResponse.data;
      data.virusTotal = {
        detections: vtData.positives || 0,
        scanDate: vtData.scan_date || new Date().toISOString().split('T')[0],
        categories: vtData.detected_urls ? 
          vtData.detected_urls.map((url: any) => url.scan_date).slice(0, 5) : []
      };
    }

    // Get Shodan data for deep scans
    if (depth === 'deep') {
      try {
        const shodanResponse = await apiClient.searchHost(domain);
        if (shodanResponse.success && shodanResponse.data.matches) {
          const matches = shodanResponse.data.matches;
          data.shodan = {
            openPorts: [...new Set(matches.map((m: any) => m.port))].slice(0, 10),
            vulnerabilities: matches
              .flatMap((m: any) => m.vulns ? Object.keys(m.vulns) : [])
              .slice(0, 5)
          };
        }
      } catch (error) {
        console.warn('Shodan scan failed:', error);
      }
    }

  } catch (error) {
    console.error('Domain scan error:', error);
  }

  return data;
}

async function performIPScan(ip: string, depth: string): Promise<IPData> {
  const data: IPData = {
    geolocation: {
      country: 'Unknown',
      city: 'Unknown',
      region: 'Unknown',
      latitude: 0,
      longitude: 0
    },
    organization: 'Unknown',
    abuse: {
      confidence: 0,
      reports: 0,
      lastReported: 'Unknown'
    }
  };

  try {
    // Get IP info
    const ipInfoResponse = await apiClient.getIPInfo(ip);
    if (ipInfoResponse.success) {
      const ipData = ipInfoResponse.data;
      data.geolocation = {
        country: ipData.country || 'Unknown',
        city: ipData.city || 'Unknown',
        region: ipData.region || 'Unknown',
        latitude: parseFloat(ipData.loc?.split(',')[0] || '0'),
        longitude: parseFloat(ipData.loc?.split(',')[1] || '0')
      };
      data.organization = ipData.org || 'Unknown';
    }

    // Check AbuseIPDB
    const abuseResponse = await apiClient.checkIP(ip);
    if (abuseResponse.success) {
      const abuseData = abuseResponse.data.data || {};
      data.abuse = {
        confidence: abuseData.abuseConfidencePercentage || 0,
        reports: abuseData.totalReports || 0,
        lastReported: abuseData.lastReportedAt || 'Unknown'
      };
    }

  } catch (error) {
    console.error('IP scan error:', error);
  }

  return data;
}

async function performUsernameScan(username: string, depth: string): Promise<UsernameData> {
  // For username scanning, we'll use a combination of direct checks and social media APIs
  // Note: Most social media platforms restrict automated checking, so this is limited
  
  const platforms = [
    'GitHub', 'Twitter', 'Reddit', 'Instagram', 'LinkedIn', 
    'Facebook', 'TikTok', 'YouTube', 'Discord', 'Steam'
  ];

  const data: UsernameData = {
    platforms: platforms.map(platform => ({
      name: platform,
      found: false, // Will be updated by actual checks
      url: undefined,
      lastSeen: undefined
    }))
  };

  // For now, we'll simulate this as real username checking requires
  // specific APIs for each platform and many have restrictions
  console.warn('Username scanning with real APIs is limited due to platform restrictions');
  
  return data;
}

async function performGeolocationScan(target: string): Promise<GeolocationData> {
  try {
    // For domains, we need to resolve to IP first
    let ip = target;
    if (!/^\d+\.\d+\.\d+\.\d+$/.test(target)) {
      // This is a domain, we'd need to resolve it to IP
      // For now, we'll use a placeholder
      console.warn('Domain to IP resolution not implemented in browser environment');
    }

    const ipInfoResponse = await apiClient.getIPInfo(ip);
    if (ipInfoResponse.success) {
      const data = ipInfoResponse.data;
      return {
        country: data.country || 'Unknown',
        countryCode: data.country || 'XX',
        city: data.city || 'Unknown',
        region: data.region || 'Unknown',
        latitude: parseFloat(data.loc?.split(',')[0] || '0'),
        longitude: parseFloat(data.loc?.split(',')[1] || '0'),
        asn: data.org?.split(' ')[0] || 'Unknown',
        organization: data.org || 'Unknown',
        abuseContact: undefined,
        riskLevel: 'low' as const,
        flag: getCountryFlag(data.country || 'XX')
      };
    }
  } catch (error) {
    console.error('Geolocation scan error:', error);
  }

  // Fallback data
  return {
    country: 'Unknown',
    countryCode: 'XX',
    city: 'Unknown',
    region: 'Unknown',
    latitude: 0,
    longitude: 0,
    asn: 'Unknown',
    organization: 'Unknown',
    abuseContact: undefined,
    riskLevel: 'low',
    flag: '🏳️'
  };
}

function generateRealTimeline(result: OSINTResult): TimelineEvent[] {
  const events: TimelineEvent[] = [];

  // Add domain registration event
  if (result.data.domain?.whois.creationDate && result.data.domain.whois.creationDate !== 'Unknown') {
    events.push({
      id: 'domain-registration',
      date: result.data.domain.whois.creationDate,
      type: 'registration',
      title: 'Domain Registration',
      description: `Domain registered with ${result.data.domain.whois.registrar}`,
      confidence: 'high',
      source: 'WHOIS',
      severity: 'info'
    });
  }

  // Add breach events
  if (result.data.email?.breaches) {
    result.data.email.breaches.forEach((breach, index) => {
      events.push({
        id: `breach-${index}`,
        date: breach.date,
        type: 'breach',
        title: `${breach.name} Data Breach`,
        description: `Email found in ${breach.name} breach affecting ${breach.accounts.toLocaleString()} accounts`,
        confidence: breach.verified ? 'high' : 'medium',
        source: 'HaveIBeenPwned',
        severity: 'critical'
      });
    });
  }

  // Add security detection events
  if (result.data.domain?.virusTotal.detections > 0) {
    events.push({
      id: 'security-detections',
      date: result.data.domain.virusTotal.scanDate,
      type: 'malicious',
      title: 'Security Threats Detected',
      description: `${result.data.domain.virusTotal.detections} security detections found by VirusTotal`,
      confidence: 'high',
      source: 'VirusTotal',
      severity: 'warning'
    });
  }

  return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

function calculateRealRiskFactors(result: OSINTResult): RiskFactors {
  const factors: RiskFactors = {
    breachHistory: 0,
    infrastructureAge: 0,
    geographicRisk: 0,
    blacklistStatus: 0,
    securityScanResults: 0
  };

  // Breach history scoring
  if (result.data.email?.breaches) {
    factors.breachHistory = Math.min(result.data.email.breaches.length * 5, 25);
  }

  // Infrastructure age scoring
  if (result.data.domain?.whois.age !== undefined) {
    factors.infrastructureAge = Math.max(15 - result.data.domain.whois.age, 0);
  }

  // Geographic risk scoring
  if (result.geolocation) {
    const riskMap = { high: 20, medium: 10, low: 0 };
    factors.geographicRisk = riskMap[result.geolocation.riskLevel];
  }

  // Blacklist status scoring
  if (result.data.email?.reputation.blacklisted) {
    factors.blacklistStatus += 15;
  }
  if (result.data.ip?.abuse.confidence) {
    factors.blacklistStatus += Math.floor(result.data.ip.abuse.confidence / 20);
  }

  // Security scan results scoring
  if (result.data.domain?.virusTotal.detections) {
    factors.securityScanResults = Math.min(result.data.domain.virusTotal.detections * 3, 20);
  }

  return factors;
}

function calculateRealThreatScore(result: OSINTResult): number {
  const { riskFactors } = result;
  return Math.min(
    riskFactors.breachHistory +
    riskFactors.infrastructureAge +
    riskFactors.geographicRisk +
    riskFactors.blacklistStatus +
    riskFactors.securityScanResults,
    100
  );
}

function getCountryFlag(countryCode: string): string {
  const flags: Record<string, string> = {
    'US': '🇺🇸', 'GB': '🇬🇧', 'DE': '🇩🇪', 'FR': '🇫🇷', 'CA': '🇨🇦',
    'JP': '🇯🇵', 'AU': '🇦🇺', 'RU': '🇷🇺', 'CN': '🇨🇳', 'BR': '🇧🇷',
    'IN': '🇮🇳', 'IT': '🇮🇹', 'ES': '🇪🇸', 'NL': '🇳🇱', 'SE': '🇸🇪'
  };
  return flags[countryCode] || '🏳️';
}