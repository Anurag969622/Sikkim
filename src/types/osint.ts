export interface OSINTResult {
  inputType: 'email' | 'domain' | 'ip' | 'username';
  target: string;
  scanDepth: 'quick' | 'standard' | 'deep';
  timestamp: string;
  threatScore: number;
  riskFactors: RiskFactors;
  data: {
    email?: EmailData;
    domain?: DomainData;
    ip?: IPData;
    username?: UsernameData;
  };
  timeline?: TimelineEvent[];
  geolocation?: GeolocationData;
  darkWeb?: DarkWebData;
  mitreAttack?: MitreAttackData[];
  similarTargets?: SimilarTarget[];
  metadata: ReportMetadata;
}

export interface RiskFactors {
  breachHistory: number;
  infrastructureAge: number;
  geographicRisk: number;
  blacklistStatus: number;
  securityScanResults: number;
}

export interface TimelineEvent {
  id: string;
  date: string;
  type: 'registration' | 'breach' | 'malicious' | 'suspicious' | 'scan';
  title: string;
  description: string;
  confidence: 'low' | 'medium' | 'high';
  source: string;
  severity: 'info' | 'warning' | 'critical';
}

export interface GeolocationData {
  country: string;
  countryCode: string;
  city?: string;
  region?: string;
  latitude: number;
  longitude: number;
  asn: string;
  organization: string;
  abuseContact?: string;
  riskLevel: 'low' | 'medium' | 'high';
  flag: string;
}

export interface DarkWebData {
  appearances: number;
  sources: string[];
  exposureDates: string[];
  dataTypes: string[];
  lastSeen?: string;
  riskScore: number;
}

export interface MitreAttackData {
  techniqueId: string;
  tacticCategory: string;
  technique: string;
  confidence: 'low' | 'medium' | 'high';
  description: string;
  mitigation: string;
}

export interface SimilarTarget {
  target: string;
  similarity: number;
  correlationFactors: string[];
  lastSeen: string;
}

export interface ReportMetadata {
  generatedAt: string;
  expiresAt: string;
  dataFreshness: 'fresh' | 'stale' | 'expired';
  cacheStatus: 'hit' | 'miss';
  scanDuration: number;
}

export interface EmailData {
  breaches: Array<{
    name: string;
    date: string;
    accounts: number;
    verified: boolean;
  }>;
  reputation: {
    score: number;
    blacklisted: boolean;
    riskTags: string[];
  };
  patterns?: {
    corporateFormat: boolean;
    commonPattern: string;
    similarityScore: number;
  };
}

export interface DomainData {
  whois: {
    registrar: string;
    creationDate: string;
    country: string;
    age: number;
  };
  virusTotal: {
    detections: number;
    scanDate: string;
    categories: string[];
  };
  shodan?: {
    openPorts: number[];
    vulnerabilities: string[];
  };
  dns?: {
    records: Array<{ type: string; value: string }>;
  };
  ssl?: {
    issuer: string;
    expires: string;
    valid: boolean;
  };
}

export interface IPData {
  geolocation: {
    country: string;
    city: string;
    region: string;
    latitude: number;
    longitude: number;
  };
  organization: string;
  abuse: {
    confidence: number;
    reports: number;
    lastReported: string;
  };
}

export interface UsernameData {
  platforms: Array<{
    name: string;
    found: boolean;
    url?: string;
    lastSeen?: string;
  }>;
  patterns?: {
    format: string;
    variations: string[];
    corporateIndicators: boolean;
  };
}