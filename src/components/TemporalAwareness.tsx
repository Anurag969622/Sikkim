import React, { useState, useEffect } from 'react';
import { Clock, RefreshCw, AlertTriangle, Calendar, Database } from 'lucide-react';
import { ReportMetadata } from '../types/osint';

interface TemporalAwarenessProps {
  metadata: ReportMetadata;
  onRescan?: () => void;
}

export default function TemporalAwareness({ metadata, onRescan }: TemporalAwarenessProps) {
  const [timeUntilExpiry, setTimeUntilExpiry] = useState<string>('');
  const [freshnessStatus, setFreshnessStatus] = useState<'fresh' | 'stale' | 'expired'>('fresh');

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const expiry = new Date(metadata.expiresAt);
      const diff = expiry.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeUntilExpiry('Expired');
        setFreshnessStatus('expired');
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        if (hours > 0) {
          setTimeUntilExpiry(`${hours}h ${minutes}m`);
        } else if (minutes > 0) {
          setTimeUntilExpiry(`${minutes}m ${seconds}s`);
        } else {
          setTimeUntilExpiry(`${seconds}s`);
        }

        // Update freshness status
        if (diff < 30 * 60 * 1000) { // Less than 30 minutes
          setFreshnessStatus('stale');
        } else {
          setFreshnessStatus('fresh');
        }
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [metadata.expiresAt]);

  const getFreshnessColor = (status: string) => {
    switch (status) {
      case 'fresh': return 'text-green-400 bg-green-900/30 border-green-400/50';
      case 'stale': return 'text-yellow-400 bg-yellow-900/30 border-yellow-400/50';
      case 'expired': return 'text-red-400 bg-red-900/30 border-red-400/50';
      default: return 'text-gray-400 bg-gray-700 border-gray-600';
    }
  };

  const getFreshnessIcon = (status: string) => {
    switch (status) {
      case 'fresh': return Database;
      case 'stale': return AlertTriangle;
      case 'expired': return AlertTriangle;
      default: return Clock;
    }
  };

  const FreshnessIcon = getFreshnessIcon(freshnessStatus);

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-400/20 rounded-lg">
          <Clock className="text-blue-400" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Temporal Awareness</h3>
          <p className="text-gray-400 text-sm">Report freshness and data validity tracking</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Generation Time */}
        <div className="bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={16} className="text-blue-400" />
            <span className="text-white font-medium text-sm">Generated</span>
          </div>
          <div className="text-gray-300 text-xs">
            {new Date(metadata.generatedAt).toLocaleString()}
          </div>
        </div>

        {/* Expiry Countdown */}
        <div className="bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={16} className="text-orange-400" />
            <span className="text-white font-medium text-sm">Expires In</span>
          </div>
          <div className={`text-xs font-mono ${
            freshnessStatus === 'expired' ? 'text-red-400' :
            freshnessStatus === 'stale' ? 'text-yellow-400' : 'text-green-400'
          }`}>
            {timeUntilExpiry}
          </div>
        </div>

        {/* Data Freshness */}
        <div className="bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <FreshnessIcon size={16} className={
              freshnessStatus === 'fresh' ? 'text-green-400' :
              freshnessStatus === 'stale' ? 'text-yellow-400' : 'text-red-400'
            } />
            <span className="text-white font-medium text-sm">Freshness</span>
          </div>
          <div className={`text-xs uppercase font-bold ${
            freshnessStatus === 'fresh' ? 'text-green-400' :
            freshnessStatus === 'stale' ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {freshnessStatus}
          </div>
        </div>

        {/* Cache Status */}
        <div className="bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Database size={16} className="text-purple-400" />
            <span className="text-white font-medium text-sm">Cache</span>
          </div>
          <div className={`text-xs uppercase font-bold ${
            metadata.cacheStatus === 'hit' ? 'text-green-400' : 'text-blue-400'
          }`}>
            {metadata.cacheStatus}
          </div>
        </div>
      </div>

      {/* Freshness Status */}
      <div className={`p-4 rounded-lg border mb-6 ${getFreshnessColor(freshnessStatus)}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FreshnessIcon size={16} />
            <span className="font-medium">
              {freshnessStatus === 'fresh' && 'Data is Current'}
              {freshnessStatus === 'stale' && 'Data is Getting Stale'}
              {freshnessStatus === 'expired' && 'Data Has Expired'}
            </span>
          </div>
          {onRescan && (
            <button
              onClick={onRescan}
              className="flex items-center gap-2 px-3 py-1 bg-white/10 hover:bg-white/20 rounded transition-colors"
            >
              <RefreshCw size={14} />
              <span className="text-sm">Rescan</span>
            </button>
          )}
        </div>
        <p className="text-sm opacity-90 mt-1">
          {freshnessStatus === 'fresh' && 'Intelligence data is current and reliable for decision making.'}
          {freshnessStatus === 'stale' && 'Consider refreshing data for the most current intelligence.'}
          {freshnessStatus === 'expired' && 'Data has expired. Rescan recommended for accurate results.'}
        </p>
      </div>

      {/* Scan Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-700/50 rounded-lg p-4">
          <h4 className="text-white font-medium mb-3">Scan Performance</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Duration:</span>
              <span className="text-white">{(metadata.scanDuration / 1000).toFixed(1)}s</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Cache Hit:</span>
              <span className={metadata.cacheStatus === 'hit' ? 'text-green-400' : 'text-blue-400'}>
                {metadata.cacheStatus === 'hit' ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-700/50 rounded-lg p-4">
          <h4 className="text-white font-medium mb-3">Auto-Rescan Settings</h4>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="rounded" defaultChecked />
              <span className="text-gray-300">Enable auto-rescan</span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="rounded" />
              <span className="text-gray-300">Alert on expiry</span>
            </label>
          </div>
        </div>
      </div>

      {/* Historical Comparison */}
      <div className="bg-gray-700/50 rounded-lg p-4">
        <h4 className="text-white font-medium mb-3 flex items-center gap-2">
          <RefreshCw size={16} className="text-cyan-400" />
          Historical Comparison
        </h4>
        <div className="text-sm text-gray-400 mb-3">
          Compare with previous scans to identify changes over time
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-cyan-600 hover:bg-cyan-700 text-white text-sm rounded transition-colors">
            View History
          </button>
          <button className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded transition-colors">
            Compare Changes
          </button>
        </div>
      </div>

      {/* Cache Management */}
      <div className="mt-4 p-3 bg-indigo-900/20 border border-indigo-400/30 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Database size={16} className="text-indigo-400" />
          <span className="text-indigo-400 font-medium">Cache Management</span>
        </div>
        <p className="text-gray-300 text-sm">
          Intelligent caching reduces API calls and improves response times while ensuring data freshness.
        </p>
      </div>
    </div>
  );
}