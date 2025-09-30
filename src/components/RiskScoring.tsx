import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, AlertTriangle, Shield } from 'lucide-react';
import { RiskFactors } from '../types/osint';

interface RiskScoringProps {
  riskFactors: RiskFactors;
  totalScore: number;
}

export default function RiskScoring({ riskFactors, totalScore }: RiskScoringProps) {
  const factors = [
    { name: 'Breach History', value: riskFactors.breachHistory, max: 25, color: '#ef4444' },
    { name: 'Infrastructure Age', value: riskFactors.infrastructureAge, max: 15, color: '#f97316' },
    { name: 'Geographic Risk', value: riskFactors.geographicRisk, max: 20, color: '#eab308' },
    { name: 'Blacklist Status', value: riskFactors.blacklistStatus, max: 20, color: '#dc2626' },
    { name: 'Security Scans', value: riskFactors.securityScanResults, max: 20, color: '#7c3aed' }
  ];

  const getRiskCategory = (score: number) => {
    if (score < 30) return { level: 'Low Risk', color: 'text-green-400', icon: Shield, emoji: '🟢' };
    if (score < 70) return { level: 'Medium Risk', color: 'text-yellow-400', icon: AlertTriangle, emoji: '🟠' };
    return { level: 'High Risk', color: 'text-red-400', icon: AlertTriangle, emoji: '🔴' };
  };

  const risk = getRiskCategory(totalScore);
  const RiskIcon = risk.icon;

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-orange-400/20 rounded-lg">
          <TrendingUp className="text-orange-400" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Risk Scoring Engine</h3>
          <p className="text-gray-400 text-sm">Composite threat assessment with weighted factors</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overall Score */}
        <div className="space-y-4">
          <div className="text-center">
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-full border-8 border-gray-600 flex items-center justify-center relative">
                <div 
                  className={`absolute inset-0 rounded-full border-8 border-transparent ${
                    totalScore < 30 ? 'border-t-green-400 border-r-green-400' :
                    totalScore < 70 ? 'border-t-yellow-400 border-r-yellow-400' :
                    'border-t-red-400 border-r-red-400'
                  }`}
                  style={{
                    transform: `rotate(${(totalScore / 100) * 360}deg)`,
                    transition: 'transform 2s ease-out'
                  }}
                ></div>
                <div className="text-center z-10">
                  <div className={`text-3xl font-bold ${risk.color}`}>{totalScore}</div>
                  <div className="text-xs text-gray-400">/ 100</div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className={`flex items-center justify-center gap-2 ${risk.color} text-lg font-semibold`}>
                <span>{risk.emoji}</span>
                <RiskIcon size={20} />
                <span>{risk.level}</span>
              </div>
            </div>
          </div>

          {/* Contributing Factors Summary */}
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h4 className="text-white font-medium mb-3">Top Contributing Factors</h4>
            <div className="space-y-2">
              {factors
                .sort((a, b) => b.value - a.value)
                .slice(0, 3)
                .map((factor, index) => (
                  <div key={factor.name} className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">{factor.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-600 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-1000"
                          style={{ 
                            width: `${(factor.value / factor.max) * 100}%`,
                            backgroundColor: factor.color
                          }}
                        ></div>
                      </div>
                      <span className="text-white text-sm font-medium w-8 text-right">
                        {factor.value}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="space-y-4">
          <h4 className="text-white font-medium">Risk Factor Breakdown</h4>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={factors} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {factors.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Factor Details */}
          <div className="space-y-2">
            {factors.map((factor) => (
              <div key={factor.name} className="flex items-center justify-between p-2 bg-gray-700/30 rounded">
                <span className="text-gray-300 text-sm">{factor.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm">{factor.value}</span>
                  <span className="text-gray-400 text-xs">/ {factor.max}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real-time Updates Notice */}
      <div className="mt-6 p-3 bg-purple-900/20 border border-purple-400/30 rounded-lg">
        <div className="flex items-center gap-2 text-purple-400 text-sm">
          <TrendingUp size={16} />
          <span className="font-medium">Dynamic Scoring</span>
        </div>
        <p className="text-gray-300 text-sm mt-1">
          Risk scores update in real-time as new intelligence data becomes available.
        </p>
      </div>
    </div>
  );
}