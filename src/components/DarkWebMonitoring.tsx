import React, { useState } from 'react';
import { Eye, AlertTriangle, Calendar, Database, Shield } from 'lucide-react';
import { DarkWebData } from '../types/osint';

interface DarkWebMonitoringProps {
  data: DarkWebData;
}

export default function DarkWebMonitoring({ data }: DarkWebMonitoringProps) {
  const [selectedSource, setSelectedSource] = useState<string>('all');

  const getRiskColor = (score: number) => {
    if (score < 30) return 'text-green-400 bg-green-900/30 border-green-400/50';
    if (score < 70) return 'text-yellow-400 bg-yellow-900/30 border-yellow-400/50';
    return 'text-red-400 bg-red-900/30 border-red-400/50';
  };

  const getDataTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'credentials': return '🔑';
      case 'personal': return '👤';
      case 'financial': return '💳';
      case 'corporate': return '🏢';
      default: return '📄';
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-red-400/20 rounded-lg">
          <Eye className="text-red-400" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Dark Web Monitoring</h3>
          <p className="text-gray-400 text-sm">Exposure analysis across underground platforms</p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-700/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-400">{data.appearances}</div>
          <div className="text-xs text-gray-400 mt-1">Total Appearances</div>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-orange-400">{data.sources.length}</div>
          <div className="text-xs text-gray-400 mt-1">Source Platforms</div>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400">{data.dataTypes.length}</div>
          <div className="text-xs text-gray-400 mt-1">Data Types</div>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-4 text-center">
          <div className={`text-2xl font-bold ${data.riskScore < 30 ? 'text-green-400' : data.riskScore < 70 ? 'text-yellow-400' : 'text-red-400'}`}>
            {data.riskScore}
          </div>
          <div className="text-xs text-gray-400 mt-1">Risk Score</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Source Platforms */}
        <div className="space-y-4">
          <h4 className="text-white font-medium flex items-center gap-2">
            <Database size={16} className="text-purple-400" />
            Source Platforms
          </h4>
          
          <div className="space-y-2">
            {data.sources.map((source, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                  <span className="text-white font-medium">{source}</span>
                </div>
                <div className="text-xs text-gray-400">
                  {Math.floor(Math.random() * 10) + 1} appearances
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Types Exposed */}
        <div className="space-y-4">
          <h4 className="text-white font-medium flex items-center gap-2">
            <Shield size={16} className="text-orange-400" />
            Exposed Data Types
          </h4>
          
          <div className="grid grid-cols-2 gap-2">
            {data.dataTypes.map((type, index) => (
              <div key={index} className="p-3 bg-gray-700/50 rounded-lg text-center hover:bg-gray-700 transition-colors">
                <div className="text-2xl mb-1">{getDataTypeIcon(type)}</div>
                <div className="text-white text-sm font-medium">{type}</div>
                <div className="text-xs text-gray-400 mt-1">
                  {Math.floor(Math.random() * 5) + 1} instances
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-6">
        <h4 className="text-white font-medium flex items-center gap-2 mb-4">
          <Calendar size={16} className="text-blue-400" />
          Exposure Timeline
        </h4>
        
        <div className="space-y-3">
          {data.exposureDates.map((date, index) => (
            <div key={index} className="flex items-center gap-4 p-3 bg-gray-700/30 rounded-lg">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="flex-1">
                <div className="text-white text-sm">Data exposure detected</div>
                <div className="text-gray-400 text-xs">{new Date(date).toLocaleDateString()}</div>
              </div>
              <div className="text-xs text-gray-400">
                Platform: {data.sources[index % data.sources.length]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Assessment */}
      <div className={`mt-6 p-4 rounded-lg border ${getRiskColor(data.riskScore)}`}>
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle size={16} />
          <span className="font-medium">Dark Web Risk Assessment</span>
        </div>
        <p className="text-sm opacity-90">
          {data.riskScore < 30 
            ? 'Low exposure detected. Monitor for changes.'
            : data.riskScore < 70 
              ? 'Moderate exposure found. Consider security measures.'
              : 'High exposure detected. Immediate action recommended.'
          }
        </p>
        {data.lastSeen && (
          <div className="text-xs mt-2 opacity-75">
            Last seen: {new Date(data.lastSeen).toLocaleDateString()}
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-400/30 rounded-lg">
        <div className="flex items-center gap-2 text-yellow-400 text-sm">
          <AlertTriangle size={16} />
          <span className="font-medium">Simulated Results</span>
        </div>
        <p className="text-gray-300 text-sm mt-1">
          This is a demonstration with simulated dark web monitoring data. Real implementations require specialized access and legal compliance.
        </p>
      </div>
    </div>
  );
}