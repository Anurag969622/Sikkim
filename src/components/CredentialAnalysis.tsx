import React from 'react';
import { Key, User, Building, AlertCircle, CheckCircle } from 'lucide-react';

interface CredentialAnalysisProps {
  target: string;
  inputType: string;
}

interface CredentialPattern {
  type: string;
  detected: boolean;
  confidence: number;
  description: string;
  examples: string[];
}

export default function CredentialAnalysis({ target, inputType }: CredentialAnalysisProps) {
  const analyzePatterns = (): CredentialPattern[] => {
    if (inputType === 'email') {
      const email = target.toLowerCase();
      const [localPart, domain] = email.split('@');
      
      return [
        {
          type: 'Corporate Standard',
          detected: /^[a-z]+\.[a-z]+$/.test(localPart),
          confidence: /^[a-z]+\.[a-z]+$/.test(localPart) ? 85 : 20,
          description: 'firstname.lastname format commonly used in corporate environments',
          examples: ['john.doe@company.com', 'jane.smith@corp.org']
        },
        {
          type: 'Initial Format',
          detected: /^[a-z]\.[a-z]+$/.test(localPart),
          confidence: /^[a-z]\.[a-z]+$/.test(localPart) ? 75 : 15,
          description: 'First initial + lastname format',
          examples: ['j.doe@company.com', 'm.johnson@corp.org']
        },
        {
          type: 'Employee ID',
          detected: /^\d+$/.test(localPart) || /^[a-z]+\d+$/.test(localPart),
          confidence: (/^\d+$/.test(localPart) || /^[a-z]+\d+$/.test(localPart)) ? 70 : 10,
          description: 'Numeric or alphanumeric employee identifier',
          examples: ['12345@company.com', 'emp001@corp.org']
        },
        {
          type: 'Department Based',
          detected: /(admin|hr|it|sales|support|info)/.test(localPart),
          confidence: /(admin|hr|it|sales|support|info)/.test(localPart) ? 60 : 25,
          description: 'Department or role-based email address',
          examples: ['admin@company.com', 'support@corp.org']
        }
      ];
    } else if (inputType === 'username') {
      const username = target.toLowerCase();
      
      return [
        {
          type: 'Name Based',
          detected: /^[a-z]+[a-z]*$/.test(username) && username.length > 4,
          confidence: /^[a-z]+[a-z]*$/.test(username) && username.length > 4 ? 70 : 30,
          description: 'Username appears to be based on real name',
          examples: ['johnsmith', 'janesmith123']
        },
        {
          type: 'Gaming Pattern',
          detected: /\d{2,4}$/.test(username) || /(gamer|player|pro)/.test(username),
          confidence: (/\d{2,4}$/.test(username) || /(gamer|player|pro)/.test(username)) ? 65 : 20,
          description: 'Common gaming username patterns',
          examples: ['player123', 'gamerpro', 'username2024']
        },
        {
          type: 'Professional',
          detected: /(dev|admin|manager|lead|senior)/.test(username),
          confidence: /(dev|admin|manager|lead|senior)/.test(username) ? 80 : 15,
          description: 'Professional or job-related username',
          examples: ['devjohn', 'adminuser', 'leaddev']
        }
      ];
    }
    
    return [];
  };

  const patterns = analyzePatterns();
  const detectedPatterns = patterns.filter(p => p.detected);
  const corporateIndicators = patterns.filter(p => p.type.includes('Corporate') || p.type.includes('Employee') || p.type.includes('Department')).some(p => p.detected);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 70) return 'text-green-400 bg-green-900/30';
    if (confidence >= 50) return 'text-yellow-400 bg-yellow-900/30';
    return 'text-gray-400 bg-gray-700/30';
  };

  if (inputType !== 'email' && inputType !== 'username') {
    return null;
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-cyan-400/20 rounded-lg">
          <Key className="text-cyan-400" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Credential Analysis</h3>
          <p className="text-gray-400 text-sm">Pattern recognition and corporate format detection</p>
        </div>
      </div>

      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-700/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-cyan-400">{detectedPatterns.length}</div>
          <div className="text-xs text-gray-400 mt-1">Patterns Detected</div>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-4 text-center">
          <div className={`text-2xl font-bold ${corporateIndicators ? 'text-orange-400' : 'text-green-400'}`}>
            {corporateIndicators ? 'HIGH' : 'LOW'}
          </div>
          <div className="text-xs text-gray-400 mt-1">Corporate Likelihood</div>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-400">
            {Math.max(...patterns.map(p => p.confidence), 0)}%
          </div>
          <div className="text-xs text-gray-400 mt-1">Max Confidence</div>
        </div>
      </div>

      {/* Pattern Analysis */}
      <div className="space-y-4">
        <h4 className="text-white font-medium flex items-center gap-2">
          <User size={16} className="text-blue-400" />
          Pattern Analysis Results
        </h4>

        {patterns.map((pattern, index) => (
          <div key={index} className={`p-4 rounded-lg border ${
            pattern.detected 
              ? 'bg-green-900/20 border-green-400/30' 
              : 'bg-gray-700/30 border-gray-600'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                {pattern.detected ? (
                  <CheckCircle size={16} className="text-green-400" />
                ) : (
                  <div className="w-4 h-4 border-2 border-gray-500 rounded-full"></div>
                )}
                <span className={`font-medium ${pattern.detected ? 'text-green-400' : 'text-gray-400'}`}>
                  {pattern.type}
                </span>
              </div>
              <div className={`px-2 py-1 rounded text-xs ${getConfidenceColor(pattern.confidence)}`}>
                {pattern.confidence}% confidence
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-3">{pattern.description}</p>
            <div className="text-xs text-gray-400">
              <span className="font-medium">Examples: </span>
              {pattern.examples.join(', ')}
            </div>
          </div>
        ))}
      </div>

      {/* Corporate Assessment */}
      {corporateIndicators && (
        <div className="mt-6 p-4 bg-orange-900/20 border border-orange-400/30 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Building size={16} className="text-orange-400" />
            <span className="text-orange-400 font-medium">Corporate Environment Detected</span>
          </div>
          <p className="text-gray-300 text-sm">
            This credential follows corporate naming conventions, suggesting it may be associated with an organization. 
            Consider additional OSINT techniques for corporate intelligence gathering.
          </p>
        </div>
      )}

      {/* Security Recommendations */}
      <div className="mt-6 p-4 bg-blue-900/20 border border-blue-400/30 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle size={16} className="text-blue-400" />
          <span className="text-blue-400 font-medium">Security Implications</span>
        </div>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>• Predictable patterns may indicate weak password policies</li>
          <li>• Corporate formats can aid in social engineering attacks</li>
          <li>• Consider implementing randomized credential generation</li>
          <li>• Monitor for credential stuffing attempts using these patterns</li>
        </ul>
      </div>
    </div>
  );
}