import { OSINTResult, EmailData, DomainData, IPData, UsernameData, TimelineEvent, GeolocationData, DarkWebData, MitreAttackData, SimilarTarget, RiskFactors, ReportMetadata } from '../types/osint';
import { performRealOSINTScan } from './realOsintService';
import { isRealAPIEnabled } from '../config/apiConfig';

export async function simulateOSINTScan(
  target: string,
  inputType: 'email' | 'domain' | 'ip' | 'username',
  scanDepth: 'quick' | 'standard' | 'deep'
): Promise<OSINTResult> {
  // Use real APIs if enabled and configured
  if (isRealAPIEnabled) {
    try {
      return await performRealOSINTScan(target, inputType, scanDepth);
    } catch (error) {
      console.warn('Real API scan failed, falling back to simulation:', error);
    }
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
  
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
      expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours
      dataFreshness: 'fresh',
      cacheStatus: Math.random() > 0.3 ? 'hit' : 'miss',
      scanDuration: 0
    }
  };
  
  switch (inputType) {
    case 'email':
      result.data.email = await simulateEmailScan(target, scanDepth);
      break;
    case 'domain':
      result.data.domain = await simulateDomainScan(target, scanDepth);
      if (scanDepth !== 'quick') {
        result.geolocation = await simulateGeolocation(target);
      }
      break;
    case 'ip':
      result.data.ip = await simulateIPScan(target, scanDepth);
      result.geolocation = await simulateGeolocation(target);
      break;
    case 'username':
      result.data.username = await simulateUsernameScan(target, scanDepth);
      break;
  }
  
  // Generate timeline events
  result.timeline = generateTimelineEvents(result);
  
  // Generate dark web data for deep scans
  if (scanDepth === 'deep') {
    result.darkWeb = generateDarkWebData(target);
    result.mitreAttack = generateMitreAttackData();
    result.similarTargets = generateSimilarTargets(target, inputType);
  }
  
  // Calculate risk factors and threat score
  result.riskFactors = calculateRiskFactors(result);
  result.threatScore = calculateThreatScore(result);
  
  // Update metadata
  result.metadata.scanDuration = Date.now() - startTime;
  
  return result;
}

async function simulateEmailScan(email: string, depth: string): Promise<EmailData> {
  const breaches = [
    { name: 'LinkedIn', date: '2021-06-22', accounts: 700000000, verified: true },
    { name: 'Adobe', date: '2013-10-04', accounts: 152000000, verified: true },
    { name: 'Dropbox', date: '2012-07-31', accounts: 68648009, verified: true },
    { name: 'Yahoo', date: '2014-09-22', accounts: 500000000, verified: true },
    { name: 'Equifax', date: '2017-07-29', accounts: 147900000, verified: true }
  ];
  
  const randomBreaches = breaches.slice(0, Math.floor(Math.random() * 4));
  const reputationScore = Math.floor(Math.random() * 100);
  
  const data: EmailData = {
    breaches: randomBreaches,
    reputation: {
      score: reputationScore,
      blacklisted: Math.random() > 0.8,
      riskTags: ['spam', 'phishing', 'malware', 'suspicious'].filter(() => Math.random() > 0.7)
    }
  };

  if (depth !== 'quick') {
    const [localPart] = email.split('@');
    data.patterns = {
      corporateFormat: /^[a-z]+\.[a-z]+$/.test(localPart.toLowerCase()),
      commonPattern: detectEmailPattern(localPart),
      similarityScore: Math.floor(Math.random() * 100)
    };
  }

  return data;
}

async function simulateDomainScan(domain: string, depth: string): Promise<DomainData> {
  const creationYear = 2010 + Math.floor(Math.random() * 14);
  const data: DomainData = {
    whois: {
      registrar: ['GoDaddy LLC', 'Namecheap Inc', 'Google Domains', 'Cloudflare'][Math.floor(Math.random() * 4)],
      creationDate: `${creationYear}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      country: ['US', 'UK', 'CA', 'DE', 'FR'][Math.floor(Math.random() * 5)],
      age: new Date().getFullYear() - creationYear
    },
    virusTotal: {
      detections: Math.floor(Math.random() * 8),
      scanDate: new Date().toISOString().split('T')[0],
      categories: ['safe', 'suspicious', 'malicious', 'phishing'].filter(() => Math.random() > 0.6)
    }
  };
  
  if (depth === 'deep') {
    data.shodan = {
      openPorts: [80, 443, 22, 21, 25, 53, 3389].filter(() => Math.random() > 0.6),
      vulnerabilities: ['CVE-2021-44228', 'CVE-2022-0778', 'CVE-2023-1234'].filter(() => Math.random() > 0.8)
    };
    
    data.dns = {
      records: [
        { type: 'A', value: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}` },
        { type: 'MX', value: `mail.${domain}` },
        { type: 'TXT', value: 'v=spf1 include:_spf.google.com ~all' }
      ]
    };
    
    data.ssl = {
      issuer: ['Let\'s Encrypt Authority X3', 'DigiCert Inc', 'Cloudflare Inc'][Math.floor(Math.random() * 3)],
      expires: new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      valid: Math.random() > 0.1
    };
  }
  
  return data;
}

async function simulateIPScan(ip: string, depth: string): Promise<IPData> {
  const countries = ['United States', 'United Kingdom', 'Germany', 'France', 'Canada', 'Japan', 'Australia'];
  const cities = ['New York', 'London', 'Berlin', 'Paris', 'Toronto', 'Tokyo', 'Sydney'];
  const orgs = ['Cloudflare Inc.', 'Amazon Technologies Inc.', 'Google LLC', 'Microsoft Corporation', 'Digital Ocean'];
  
  return {
    geolocation: {
      country: countries[Math.floor(Math.random() * countries.length)],
      city: cities[Math.floor(Math.random() * cities.length)],
      region: 'Region',
      latitude: (Math.random() - 0.5) * 180,
      longitude: (Math.random() - 0.5) * 360
    },
    organization: orgs[Math.floor(Math.random() * orgs.length)],
    abuse: {
      confidence: Math.floor(Math.random() * 100),
      reports: Math.floor(Math.random() * 100),
      lastReported: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }
  };
}

async function simulateUsernameScan(username: string, depth: string): Promise<UsernameData> {
  const platforms = [
    'GitHub', 'Twitter', 'Reddit', 'Instagram', 'LinkedIn', 
    'Facebook', 'TikTok', 'YouTube', 'Pastebin', 'Discord',
    'Steam', 'Twitch', 'Pinterest', 'Snapchat', 'WhatsApp'
  ];
  
  const data: UsernameData = {
    platforms: platforms.map(platform => ({
      name: platform,
      found: Math.random() > 0.6,
      url: Math.random() > 0.6 ? `https://${platform.toLowerCase()}.com/${username}` : undefined,
      lastSeen: Math.random() > 0.7 ? new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : undefined
    }))
  };

  if (depth !== 'quick') {
    data.patterns = {
      format: detectUsernamePattern(username),
      variations: generateUsernameVariations(username),
      corporateIndicators: /(admin|dev|manager|lead|senior)/.test(username.toLowerCase())
    };
  }

  return data;
}

async function simulateGeolocation(target: string): Promise<GeolocationData> {
  const countries = [
    { name: 'United States', code: 'US', flag: '🇺🇸', risk: 'low' },
    { name: 'United Kingdom', code: 'GB', flag: '🇬🇧', risk: 'low' },
    { name: 'Germany', code: 'DE', flag: '🇩🇪', risk: 'low' },
    { name: 'Russia', code: 'RU', flag: '🇷🇺', risk: 'high' },
    { name: 'China', code: 'CN', flag: '🇨🇳', risk: 'medium' },
    { name: 'Brazil', code: 'BR', flag: '🇧🇷', risk: 'medium' }
  ];
  
  const country = countries[Math.floor(Math.random() * countries.length)];
  const cities = ['New York', 'London', 'Berlin', 'Moscow', 'Beijing', 'São Paulo'];
  
  return {
    country: country.name,
    countryCode: country.code,
    city: cities[Math.floor(Math.random() * cities.length)],
    region: 'Region',
    latitude: (Math.random() - 0.5) * 180,
    longitude: (Math.random() - 0.5) * 360,
    asn: `AS${Math.floor(Math.random() * 65535)}`,
    organization: ['Cloudflare Inc.', 'Amazon Technologies Inc.', 'Google LLC'][Math.floor(Math.random() * 3)],
    abuseContact: Math.random() > 0.5 ? 'abuse@example.com' : undefined,
    riskLevel: country.risk as 'low' | 'medium' | 'high',
    flag: country.flag
  };
}

function generateTimelineEvents(result: OSINTResult): TimelineEvent[] {
  const events: TimelineEvent[] = [];
  
  // Domain registration event
  if (result.data.domain) {
    events.push({
      id: 'registration',
      date: result.data.domain.whois.creationDate,
      type: 'registration',
      title: 'Domain Registration',
      description: `Domain registered with ${result.data.domain.whois.registrar}`,
      confidence: 'high',
      source: 'WHOIS',
      severity: 'info'
    });
  }
  
  // Breach events
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
  
  // Security scan events
  if (result.data.domain?.virusTotal.detections > 0) {
    events.push({
      id: 'security-scan',
      date: result.data.domain.virusTotal.scanDate,
      type: 'malicious',
      title: 'Security Threats Detected',
      description: `${result.data.domain.virusTotal.detections} security detections found`,
      confidence: 'high',
      source: 'VirusTotal',
      severity: 'warning'
    });
  }
  
  return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

function generateDarkWebData(target: string): DarkWebData {
  const sources = ['Tor Markets', 'Paste Sites', 'Forums', 'Telegram', 'Discord', 'IRC'];
  const dataTypes = ['Credentials', 'Personal Info', 'Financial', 'Corporate'];
  
  const appearances = Math.floor(Math.random() * 20);
  const selectedSources = sources.filter(() => Math.random() > 0.6);
  const selectedDataTypes = dataTypes.filter(() => Math.random() > 0.5);
  
  return {
    appearances,
    sources: selectedSources.length > 0 ? selectedSources : [sources[0]],
    exposureDates: Array.from({ length: Math.min(appearances, 5) }, () => 
      new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    ),
    dataTypes: selectedDataTypes.length > 0 ? selectedDataTypes : [dataTypes[0]],
    lastSeen: Math.random() > 0.5 ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : undefined,
    riskScore: Math.min(appearances * 5 + selectedDataTypes.length * 10, 100)
  };
}

function generateMitreAttackData(): MitreAttackData[] {
  const techniques = [
    {
      techniqueId: 'T1566.001',
      tacticCategory: 'Initial Access',
      technique: 'Spearphishing Attachment',
      confidence: 'high' as const,
      description: 'Adversaries may send spearphishing emails with a malicious attachment in an attempt to gain access to victim systems.',
      mitigation: 'Implement email security solutions and user awareness training.'
    },
    {
      techniqueId: 'T1078',
      tacticCategory: 'Defense Evasion',
      technique: 'Valid Accounts',
      confidence: 'medium' as const,
      description: 'Adversaries may obtain and abuse credentials of existing accounts as a means of gaining Initial Access.',
      mitigation: 'Implement multi-factor authentication and monitor account usage.'
    },
    {
      techniqueId: 'T1110',
      tacticCategory: 'Credential Access',
      technique: 'Brute Force',
      confidence: 'medium' as const,
      description: 'Adversaries may use brute force techniques to gain access to accounts when passwords are unknown.',
      mitigation: 'Implement account lockout policies and monitor failed login attempts.'
    }
  ];
  
  return techniques.filter(() => Math.random() > 0.4);
}

function generateSimilarTargets(target: string, inputType: string): SimilarTarget[] {
  const generateSimilarTarget = (index: number): SimilarTarget => {
    let similarTarget: string;
    
    switch (inputType) {
      case 'email':
        const [local, domain] = target.split('@');
        similarTarget = `${local}${index}@${domain}`;
        break;
      case 'domain':
        similarTarget = `${target.split('.')[0]}${index}.${target.split('.').slice(1).join('.')}`;
        break;
      case 'ip':
        const parts = target.split('.');
        parts[3] = String(parseInt(parts[3]) + index);
        similarTarget = parts.join('.');
        break;
      case 'username':
        similarTarget = `${target}${index}`;
        break;
      default:
        similarTarget = `${target}-${index}`;
    }
    
    return {
      target: similarTarget,
      similarity: Math.floor(Math.random() * 40) + 60, // 60-100% similarity
      correlationFactors: ['Infrastructure Pattern', 'Temporal Relationship', 'Geographic Cluster'].filter(() => Math.random() > 0.5),
      lastSeen: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
  };
  
  return Array.from({ length: 5 }, (_, i) => generateSimilarTarget(i + 1))
    .sort((a, b) => b.similarity - a.similarity);
}

function calculateRiskFactors(result: OSINTResult): RiskFactors {
  const factors: RiskFactors = {
    breachHistory: 0,
    infrastructureAge: 0,
    geographicRisk: 0,
    blacklistStatus: 0,
    securityScanResults: 0
  };
  
  // Breach history (0-25)
  if (result.data.email?.breaches) {
    factors.breachHistory = Math.min(result.data.email.breaches.length * 8, 25);
  }
  
  // Infrastructure age (0-15) - newer domains are riskier
  if (result.data.domain?.whois.age !== undefined) {
    factors.infrastructureAge = Math.max(15 - result.data.domain.whois.age, 0);
  }
  
  // Geographic risk (0-20)
  if (result.geolocation) {
    const riskMap = { high: 20, medium: 10, low: 0 };
    factors.geographicRisk = riskMap[result.geolocation.riskLevel];
  }
  
  // Blacklist status (0-20)
  if (result.data.email?.reputation.blacklisted) {
    factors.blacklistStatus = 20;
  }
  if (result.data.ip?.abuse.confidence) {
    factors.blacklistStatus = Math.floor(result.data.ip.abuse.confidence / 5);
  }
  
  // Security scan results (0-20)
  if (result.data.domain?.virusTotal.detections) {
    factors.securityScanResults = Math.min(result.data.domain.virusTotal.detections * 4, 20);
  }
  
  return factors;
}

function calculateThreatScore(result: OSINTResult): number {
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

function detectEmailPattern(localPart: string): string {
  const lower = localPart.toLowerCase();
  if (/^[a-z]+\.[a-z]+$/.test(lower)) return 'firstname.lastname';
  if (/^[a-z]\.[a-z]+$/.test(lower)) return 'f.lastname';
  if (/^\d+$/.test(lower)) return 'numeric';
  if (/^[a-z]+\d+$/.test(lower)) return 'name+number';
  return 'custom';
}

function detectUsernamePattern(username: string): string {
  const lower = username.toLowerCase();
  if (/^[a-z]+\d{2,4}$/.test(lower)) return 'name+number';
  if (/(gamer|player|pro)/.test(lower)) return 'gaming';
  if (/(dev|admin|manager)/.test(lower)) return 'professional';
  return 'custom';
}

function generateUsernameVariations(username: string): string[] {
  const base = username.toLowerCase();
  return [
    `${base}123`,
    `${base}2024`,
    `${base}_official`,
    `the${base}`,
    `${base}pro`
  ];
}