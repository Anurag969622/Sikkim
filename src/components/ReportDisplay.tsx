import React, { useState } from 'react';
import { Copy, Download, Shield, ChevronDown, ChevronRight, ExternalLink, Eye, Clock, Globe, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { OSINTResult } from '../types/osint';
import ThreatMeter from './ThreatMeter';
import AnimatedCard from './AnimatedCard';
import TypewriterText from './TypewriterText';
import ReputationChecks from './ReputationChecks';
import ThreatTimeline from './ThreatTimeline';
import GeolocationMap from './GeolocationMap';
import RiskScoring from './RiskScoring';
import DarkWebMonitoring from './DarkWebMonitoring';
import CredentialAnalysis from './CredentialAnalysis';
import MitreAttackMapping from './MitreAttackMapping';
import ExportFunctionality from './ExportFunctionality';
import SimilarityAnalysis from './SimilarityAnalysis';
import TemporalAwareness from './TemporalAwareness';
import APIStatus from './APIStatus';

interface ReportDisplayProps {
  result: OSINTResult;
  aiReport: string;
}

export default function ReportDisplay({ result, aiReport }: ReportDisplayProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'summary' | 'technical' | 'timeline'>('summary');

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(aiReport);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text');
    }
  };

  const downloadReport = () => {
    const blob = new Blob([aiReport], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `osint-report-${result.target}-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getThreatColor = (score: number) => {
    if (score < 30) return 'text-green-400';
    if (score < 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getThreatBadge = (score: number) => {
    if (score < 30) return { text: 'LOW RISK', bg: 'bg-green-900/30', border: 'border-green-400/50', icon: CheckCircle };
    if (score < 70) return { text: 'MEDIUM RISK', bg: 'bg-yellow-900/30', border: 'border-yellow-400/50', icon: AlertCircle };
    return { text: 'HIGH RISK', bg: 'bg-red-900/30', border: 'border-red-400/50', icon: XCircle };
  };

  const renderExpandableSection = (title: string, content: React.ReactNode, key: string, delay: number = 0) => {
    const isExpanded = expandedSections.has(key);
    
    return (
      <AnimatedCard delay={delay} className="border border-gray-700 rounded-lg overflow-hidden hover:border-gray-600 transition-colors">
        <button
          onClick={() => toggleSection(key)}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-700/30 transition-colors"
        >
          <h3 className="font-medium text-white flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            {title}
          </h3>
          <div className="flex items-center gap-2">
            <div className="text-xs text-gray-400 px-2 py-1 bg-gray-700 rounded">
              {isExpanded ? 'EXPANDED' : 'COLLAPSED'}
            </div>
            {isExpanded ? <ChevronDown size={20} className="text-green-400" /> : <ChevronRight size={20} className="text-gray-400" />}
          </div>
        </button>
        <div className={`transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <div className="px-4 pb-4 border-t border-gray-700">
            {content}
          </div>
        </div>
      </AnimatedCard>
    );
  };

  const badge = getThreatBadge(result.threatScore);
  const BadgeIcon = badge.icon;

  return (
    <div className="space-y-6">
      {/* Enhanced Header with Threat Meter */}
      <AnimatedCard className="bg-gradient-to-r from-gray-800 via-gray-800 to-gray-700 rounded-lg p-6 border border-gray-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/10 to-transparent"></div>
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-400/20 rounded-lg">
                <Shield className="text-green-400" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">
                  <TypewriterText text="OSINT Analysis Complete" speed={100} />
                </h2>
                <p className="text-gray-400 text-sm">Comprehensive threat assessment generated</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-200 hover:scale-105"
              >
                <Copy size={16} />
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button
                onClick={downloadReport}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-200 hover:scale-105"
              >
                <Download size={16} />
                Download
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Target Info */}
            <div className="lg:col-span-2 space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="p-3 bg-gray-700/50 rounded-lg">
                  <div className="text-gray-400 text-xs uppercase tracking-wide">Target</div>
                  <div className="text-white font-mono text-sm mt-1">{result.target}</div>
                </div>
                <div className="p-3 bg-gray-700/50 rounded-lg">
                  <div className="text-gray-400 text-xs uppercase tracking-wide">Type</div>
                  <div className="text-white uppercase font-medium mt-1">{result.inputType}</div>
                </div>
                <div className="p-3 bg-gray-700/50 rounded-lg">
                  <div className="text-gray-400 text-xs uppercase tracking-wide">Scan Depth</div>
                  <div className="text-white uppercase font-medium mt-1">{result.scanDepth}</div>
                </div>
                <div className="p-3 bg-gray-700/50 rounded-lg">
                  <div className="text-gray-400 text-xs uppercase tracking-wide">Timestamp</div>
                  <div className="text-white text-xs mt-1">{new Date(result.timestamp).toLocaleString()}</div>
                </div>
              </div>

              {/* Data Source Indicator */}
              <div className="flex items-center gap-2">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs ${
                  result.metadata.cacheStatus === 'hit' ? 'bg-green-900/30 text-green-400' : 'bg-blue-900/30 text-blue-400'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    result.metadata.cacheStatus === 'hit' ? 'bg-green-400' : 'bg-blue-400'
                  } animate-pulse`}></div>
                  {result.metadata.cacheStatus === 'hit' ? 'CACHED DATA' : 'LIVE DATA'}
                </div>
                
                {/* Threat Badge */}
                <div className={`inline-flex items-center gap-2 px-4 py-2 ${badge.bg} ${badge.border} border rounded-full`}>
                  <BadgeIcon size={16} className={getThreatColor(result.threatScore)} />
                  <span className={`font-bold text-sm ${getThreatColor(result.threatScore)}`}>
                    {badge.text}
                  </span>
                </div>
              </div>
            </div>

            {/* Threat Meter */}
            <div className="flex flex-col items-center justify-center">
              <div className="text-center mb-4">
                <div className="text-gray-400 text-xs uppercase tracking-wide">Threat Score</div>
              </div>
              <ThreatMeter score={result.threatScore} />
            </div>
          </div>
        </div>
      </AnimatedCard>

      {/* API Status */}
      <AnimatedCard delay={100}>
        <APIStatus />
      </AnimatedCard>

      {/* Enhanced AI Report with Tabs */}
      <AnimatedCard delay={200} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="border-b border-gray-700">
          <div className="flex">
            {[
              { id: 'summary', label: 'AI Assessment', icon: Eye },
              { id: 'technical', label: 'Technical Data', icon: Globe },
              { id: 'timeline', label: 'Timeline', icon: Clock }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'text-green-400 border-b-2 border-green-400 bg-green-900/20'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'summary' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                AI Threat Assessment
              </h3>
              <div className="prose prose-invert max-w-none">
                <div className="text-gray-300 whitespace-pre-line leading-relaxed bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                  <TypewriterText text={aiReport} speed={10} delay={500} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'technical' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Technical Intelligence</h3>
              
              {result.data.email && renderExpandableSection(
                'Email Intelligence',
                <div className="space-y-4 mt-4">
                  <div>
                    <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                      <AlertCircle size={16} className="text-red-400" />
                      Data Breaches
                    </h4>
                    {result.data.email.breaches.length > 0 ? (
                      <div className="space-y-2">
                        {result.data.email.breaches.map((breach, index) => (
                          <div key={index} className="p-3 bg-red-900/20 border border-red-400/30 rounded hover:bg-red-900/30 transition-colors">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-red-400">{breach.name}</span>
                              <span className="text-sm text-gray-400">{breach.date}</span>
                            </div>
                            <div className="text-sm text-gray-300">
                              {breach.accounts.toLocaleString()} accounts affected
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-green-400 flex items-center gap-2">
                        <CheckCircle size={16} />
                        No known breaches found
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-2">Reputation Analysis</h4>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="p-3 bg-gray-700/50 rounded">
                        <div className="text-gray-400">Score</div>
                        <div className="text-white font-bold">{result.data.email.reputation.score}/100</div>
                      </div>
                      <div className="p-3 bg-gray-700/50 rounded">
                        <div className="text-gray-400">Blacklisted</div>
                        <div className={result.data.email.reputation.blacklisted ? 'text-red-400' : 'text-green-400'}>
                          {result.data.email.reputation.blacklisted ? 'Yes' : 'No'}
                        </div>
                      </div>
                      <div className="p-3 bg-gray-700/50 rounded">
                        <div className="text-gray-400">Risk Tags</div>
                        <div className="text-white">
                          {result.data.email.reputation.riskTags.length > 0 
                            ? result.data.email.reputation.riskTags.join(', ')
                            : 'None'
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>,
                'email',
                0
              )}

              {result.data.domain && renderExpandableSection(
                'Domain Intelligence',
                <div className="space-y-4 mt-4">
                  <div>
                    <h4 className="font-medium text-white mb-2">WHOIS Information</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="p-3 bg-gray-700/50 rounded">
                        <div className="text-gray-400">Registrar</div>
                        <div className="text-white">{result.data.domain.whois.registrar}</div>
                      </div>
                      <div className="p-3 bg-gray-700/50 rounded">
                        <div className="text-gray-400">Creation Date</div>
                        <div className="text-white">{result.data.domain.whois.creationDate}</div>
                      </div>
                      <div className="p-3 bg-gray-700/50 rounded">
                        <div className="text-gray-400">Country</div>
                        <div className="text-white">{result.data.domain.whois.country}</div>
                      </div>
                      <div className="p-3 bg-gray-700/50 rounded">
                        <div className="text-gray-400">Age</div>
                        <div className="text-white">{result.data.domain.whois.age} years</div>
                      </div>
                    </div>
                  </div>
                  
                  {result.data.domain.shodan && (
                    <div>
                      <h4 className="font-medium text-white mb-2">Network Exposure</h4>
                      <div className="space-y-2">
                        <div className="p-3 bg-gray-700/50 rounded">
                          <span className="text-gray-400">Open Ports: </span>
                          <span className="text-white">{result.data.domain.shodan.openPorts.join(', ')}</span>
                        </div>
                        {result.data.domain.shodan.vulnerabilities.length > 0 && (
                          <div className="p-3 bg-red-900/20 border border-red-400/30 rounded">
                            <span className="text-gray-400">Vulnerabilities: </span>
                            <span className="text-red-400">{result.data.domain.shodan.vulnerabilities.join(', ')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>,
                'domain',
                100
              )}

              {result.data.ip && renderExpandableSection(
                'IP Intelligence',
                <div className="space-y-4 mt-4">
                  <div>
                    <h4 className="font-medium text-white mb-2">Geolocation</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="p-3 bg-gray-700/50 rounded">
                        <div className="text-gray-400">Country</div>
                        <div className="text-white">{result.data.ip.geolocation.country}</div>
                      </div>
                      <div className="p-3 bg-gray-700/50 rounded">
                        <div className="text-gray-400">City</div>
                        <div className="text-white">{result.data.ip.geolocation.city}</div>
                      </div>
                      <div className="p-3 bg-gray-700/50 rounded">
                        <div className="text-gray-400">Organization</div>
                        <div className="text-white">{result.data.ip.organization}</div>
                      </div>
                      <div className="p-3 bg-gray-700/50 rounded">
                        <div className="text-gray-400">Abuse Confidence</div>
                        <div className={`${result.data.ip.abuse.confidence > 50 ? 'text-red-400' : 'text-green-400'}`}>
                          {result.data.ip.abuse.confidence}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>,
                'ip',
                200
              )}

              {result.data.username && renderExpandableSection(
                'Username Intelligence',
                <div className="space-y-4 mt-4">
                  <div>
                    <h4 className="font-medium text-white mb-2">Platform Presence</h4>
                    <div className="grid gap-2">
                      {result.data.username.platforms.map((platform, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-700/50 rounded hover:bg-gray-700 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${platform.found ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`}></div>
                            <span className="text-white font-medium">{platform.name}</span>
                            {platform.found && (
                              <span className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded">FOUND</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {platform.lastSeen && (
                              <span className="text-xs text-gray-400">Last seen: {platform.lastSeen}</span>
                            )}
                            {platform.url && (
                              <a
                                href={platform.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-400 hover:text-green-300 transition-colors"
                              >
                                <ExternalLink size={14} />
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>,
                'username',
                300
              )}
            </div>
          )}

          {activeTab === 'timeline' && result.timeline && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Investigation Timeline</h3>
              <div className="space-y-4">
                {[
                  { time: '00:00', event: 'Scan initiated', status: 'completed' },
                  { time: '00:01', event: 'Input validation completed', status: 'completed' },
                  { time: '00:02', event: 'OSINT sources queried', status: 'completed' },
                  { time: '00:05', event: 'Data aggregation finished', status: 'completed' },
                  { time: '00:08', event: 'AI analysis completed', status: 'completed' },
                  { time: '00:10', event: 'Report generated', status: 'completed' }
                ].map((item, index) => (
                  <AnimatedCard key={index} delay={index * 100} className="flex items-center gap-4 p-3 bg-gray-700/30 rounded-lg">
                    <div className="text-green-400 font-mono text-sm">{item.time}</div>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <div className="text-white">{item.event}</div>
                    <div className="ml-auto">
                      <CheckCircle size={16} className="text-green-400" />
                    </div>
                  </AnimatedCard>
                ))}
              </div>
            </div>
          )}
        </div>
      </AnimatedCard>

      {/* Advanced Features */}
      <div className="grid grid-cols-1 gap-6">
        {/* Reputation Checks */}
        <AnimatedCard delay={300}>
          <ReputationChecks target={result.target} inputType={result.inputType} />
        </AnimatedCard>

        {/* Risk Scoring */}
        <AnimatedCard delay={400}>
          <RiskScoring riskFactors={result.riskFactors} totalScore={result.threatScore} />
        </AnimatedCard>

        {/* Geolocation (for IP/Domain) */}
        {result.geolocation && (
          <AnimatedCard delay={500}>
            <GeolocationMap data={result.geolocation} />
          </AnimatedCard>
        )}

        {/* Timeline */}
        {result.timeline && result.timeline.length > 0 && (
          <AnimatedCard delay={600}>
            <ThreatTimeline events={result.timeline} />
          </AnimatedCard>
        )}

        {/* Dark Web Monitoring (Deep scans only) */}
        {result.darkWeb && (
          <AnimatedCard delay={700}>
            <DarkWebMonitoring data={result.darkWeb} />
          </AnimatedCard>
        )}

        {/* Credential Analysis */}
        <AnimatedCard delay={800}>
          <CredentialAnalysis target={result.target} inputType={result.inputType} />
        </AnimatedCard>

        {/* MITRE ATT&CK Mapping (Deep scans only) */}
        {result.mitreAttack && result.mitreAttack.length > 0 && (
          <AnimatedCard delay={900}>
            <MitreAttackMapping data={result.mitreAttack} />
          </AnimatedCard>
        )}

        {/* Similarity Analysis (Deep scans only) */}
        {result.similarTargets && result.similarTargets.length > 0 && (
          <AnimatedCard delay={1000}>
            <SimilarityAnalysis targets={result.similarTargets} currentTarget={result.target} />
          </AnimatedCard>
        )}

        {/* Temporal Awareness */}
        <AnimatedCard delay={1100}>
          <TemporalAwareness metadata={result.metadata} />
        </AnimatedCard>

        {/* Export Functionality */}
        <AnimatedCard delay={1200}>
          <ExportFunctionality result={result} aiReport={aiReport} />
        </AnimatedCard>
      </div>
    </div>
  );
}