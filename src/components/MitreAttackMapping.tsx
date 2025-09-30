import React, { useState } from 'react';
import { Shield, ExternalLink, ChevronDown, ChevronRight, AlertTriangle } from 'lucide-react';
import { MitreAttackData } from '../types/osint';

interface MitreAttackMappingProps {
  data: MitreAttackData[];
}

export default function MitreAttackMapping({ data }: MitreAttackMappingProps) {
  const [expandedTechniques, setExpandedTechniques] = useState<Set<string>>(new Set());

  const toggleTechnique = (techniqueId: string) => {
    const newExpanded = new Set(expandedTechniques);
    if (newExpanded.has(techniqueId)) {
      newExpanded.delete(techniqueId);
    } else {
      newExpanded.add(techniqueId);
    }
    setExpandedTechniques(newExpanded);
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'bg-red-900/30 text-red-400 border-red-400/50';
      case 'medium': return 'bg-yellow-900/30 text-yellow-400 border-yellow-400/50';
      default: return 'bg-gray-700 text-gray-400 border-gray-600';
    }
  };

  const getTacticColor = (tactic: string) => {
    const colors: Record<string, string> = {
      'Initial Access': 'bg-red-900/20 text-red-400',
      'Execution': 'bg-orange-900/20 text-orange-400',
      'Persistence': 'bg-yellow-900/20 text-yellow-400',
      'Privilege Escalation': 'bg-green-900/20 text-green-400',
      'Defense Evasion': 'bg-blue-900/20 text-blue-400',
      'Credential Access': 'bg-indigo-900/20 text-indigo-400',
      'Discovery': 'bg-purple-900/20 text-purple-400',
      'Lateral Movement': 'bg-pink-900/20 text-pink-400',
      'Collection': 'bg-cyan-900/20 text-cyan-400',
      'Command and Control': 'bg-teal-900/20 text-teal-400',
      'Exfiltration': 'bg-emerald-900/20 text-emerald-400',
      'Impact': 'bg-rose-900/20 text-rose-400'
    };
    return colors[tactic] || 'bg-gray-700/20 text-gray-400';
  };

  // Group techniques by tactic
  const techniquesByTactic = data.reduce((acc, technique) => {
    if (!acc[technique.tacticCategory]) {
      acc[technique.tacticCategory] = [];
    }
    acc[technique.tacticCategory].push(technique);
    return acc;
  }, {} as Record<string, MitreAttackData[]>);

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-red-400/20 rounded-lg">
          <Shield className="text-red-400" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">MITRE ATT&CK Correlation</h3>
          <p className="text-gray-400 text-sm">Mapped threat behaviors to MITRE framework</p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-700/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-400">{data.length}</div>
          <div className="text-xs text-gray-400 mt-1">Techniques Mapped</div>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-orange-400">{Object.keys(techniquesByTactic).length}</div>
          <div className="text-xs text-gray-400 mt-1">Tactic Categories</div>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400">
            {data.filter(t => t.confidence === 'high').length}
          </div>
          <div className="text-xs text-gray-400 mt-1">High Confidence</div>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-400">
            {data.filter(t => t.confidence === 'medium').length}
          </div>
          <div className="text-xs text-gray-400 mt-1">Medium Confidence</div>
        </div>
      </div>

      {/* Techniques by Tactic */}
      <div className="space-y-4">
        {Object.entries(techniquesByTactic).map(([tactic, techniques]) => (
          <div key={tactic} className="border border-gray-600 rounded-lg overflow-hidden">
            <div className={`p-4 ${getTacticColor(tactic)} border-b border-gray-600`}>
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{tactic}</h4>
                <div className="text-sm opacity-75">{techniques.length} technique{techniques.length !== 1 ? 's' : ''}</div>
              </div>
            </div>
            
            <div className="divide-y divide-gray-600">
              {techniques.map((technique) => {
                const isExpanded = expandedTechniques.has(technique.techniqueId);
                
                return (
                  <div key={technique.techniqueId} className="bg-gray-700/30">
                    <button
                      onClick={() => toggleTechnique(technique.techniqueId)}
                      className="w-full p-4 text-left hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`px-2 py-1 rounded text-xs border ${getConfidenceColor(technique.confidence)}`}>
                            {technique.confidence.toUpperCase()}
                          </div>
                          <span className="text-white font-medium">{technique.techniqueId}</span>
                          <span className="text-gray-300">{technique.technique}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <a
                            href={`https://attack.mitre.org/techniques/${technique.techniqueId.replace('.', '/')}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            <ExternalLink size={14} />
                          </a>
                          {isExpanded ? (
                            <ChevronDown size={16} className="text-gray-400" />
                          ) : (
                            <ChevronRight size={16} className="text-gray-400" />
                          )}
                        </div>
                      </div>
                    </button>
                    
                    {/* Expanded content */}
                    <div className={`transition-all duration-300 ease-in-out ${
                      isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    } overflow-hidden`}>
                      <div className="px-4 pb-4 space-y-3">
                        <div>
                          <h5 className="text-white font-medium mb-1">Description</h5>
                          <p className="text-gray-300 text-sm">{technique.description}</p>
                        </div>
                        
                        <div>
                          <h5 className="text-white font-medium mb-1">Mitigation</h5>
                          <p className="text-gray-300 text-sm">{technique.mitigation}</p>
                        </div>
                        
                        <div className="flex items-center gap-2 pt-2">
                          <a
                            href={`https://attack.mitre.org/techniques/${technique.techniqueId.replace('.', '/')}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
                          >
                            <ExternalLink size={12} />
                            View in MITRE ATT&CK
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Framework Info */}
      <div className="mt-6 p-4 bg-blue-900/20 border border-blue-400/30 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Shield size={16} className="text-blue-400" />
          <span className="text-blue-400 font-medium">MITRE ATT&CK Framework</span>
        </div>
        <p className="text-gray-300 text-sm">
          The MITRE ATT&CK framework is a globally-accessible knowledge base of adversary tactics and techniques 
          based on real-world observations. These mappings help understand potential attack vectors and defensive measures.
        </p>
      </div>
    </div>
  );
}