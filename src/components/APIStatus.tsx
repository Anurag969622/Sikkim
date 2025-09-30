import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, AlertTriangle, CheckCircle, Clock, Settings } from 'lucide-react';
import { apiConfig, isRealAPIEnabled } from '../config/apiConfig';
import { apiCache } from '../utils/cache';

export default function APIStatus() {
  const [apiStatuses, setApiStatuses] = useState<Record<string, 'online' | 'offline' | 'limited' | 'unknown'>>({});
  const [showDetails, setShowDetails] = useState(false);
  const [cacheStats, setCacheStats] = useState({ size: 0, hits: 0, misses: 0 });

  useEffect(() => {
    checkAPIStatuses();
    updateCacheStats();
    
    const interval = setInterval(() => {
      updateCacheStats();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const checkAPIStatuses = async () => {
    const statuses: Record<string, 'online' | 'offline' | 'limited' | 'unknown'> = {};
    
    // Check if API keys are configured
    Object.entries(apiConfig).forEach(([name, config]) => {
      if (!isRealAPIEnabled) {
        statuses[name] = 'offline';
      } else if (config.apiKey || config.token) {
        statuses[name] = 'online';
      } else {
        statuses[name] = 'limited';
      }
    });
    
    setApiStatuses(statuses);
  };

  const updateCacheStats = () => {
    setCacheStats({
      size: apiCache.size(),
      hits: 0, // Would need to track this in the cache implementation
      misses: 0 // Would need to track this in the cache implementation
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle size={16} className="text-green-400" />;
      case 'offline': return <WifiOff size={16} className="text-red-400" />;
      case 'limited': return <AlertTriangle size={16} className="text-yellow-400" />;
      default: return <Clock size={16} className="text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-400';
      case 'offline': return 'text-red-400';
      case 'limited': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'Online';
      case 'offline': return 'Offline';
      case 'limited': return 'Limited';
      default: return 'Unknown';
    }
  };

  const overallStatus = Object.values(apiStatuses).some(s => s === 'online') ? 'online' : 
                      Object.values(apiStatuses).some(s => s === 'limited') ? 'limited' : 'offline';

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-400/20 rounded-lg">
            {overallStatus === 'online' ? (
              <Wifi className="text-blue-400" size={20} />
            ) : (
              <WifiOff className="text-red-400" size={20} />
            )}
          </div>
          <div>
            <h3 className="text-white font-medium">API Status</h3>
            <p className={`text-sm ${getStatusColor(overallStatus)}`}>
              {isRealAPIEnabled ? 'Real APIs Enabled' : 'Simulation Mode'}
            </p>
          </div>
        </div>
        
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center gap-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
        >
          <Settings size={14} />
          {showDetails ? 'Hide' : 'Show'} Details
        </button>
      </div>

      {/* Quick Status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="bg-gray-700/50 rounded-lg p-3 text-center">
          <div className={`text-lg font-bold ${getStatusColor(overallStatus)}`}>
            {Object.values(apiStatuses).filter(s => s === 'online').length}
          </div>
          <div className="text-xs text-gray-400">Online</div>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-yellow-400">
            {Object.values(apiStatuses).filter(s => s === 'limited').length}
          </div>
          <div className="text-xs text-gray-400">Limited</div>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-blue-400">{cacheStats.size}</div>
          <div className="text-xs text-gray-400">Cached</div>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-purple-400">
            {isRealAPIEnabled ? 'LIVE' : 'SIM'}
          </div>
          <div className="text-xs text-gray-400">Mode</div>
        </div>
      </div>

      {/* Detailed Status */}
      {showDetails && (
        <div className="space-y-2">
          <h4 className="text-white font-medium text-sm mb-3">Service Status</h4>
          {Object.entries(apiStatuses).map(([service, status]) => (
            <div key={service} className="flex items-center justify-between p-2 bg-gray-700/30 rounded">
              <div className="flex items-center gap-3">
                {getStatusIcon(status)}
                <span className="text-white text-sm capitalize">
                  {service.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs ${getStatusColor(status)}`}>
                  {getStatusText(status)}
                </span>
                {status === 'limited' && (
                  <span className="text-xs text-gray-400">(No API Key)</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Configuration Notice */}
      {!isRealAPIEnabled && (
        <div className="mt-4 p-3 bg-blue-900/20 border border-blue-400/30 rounded-lg">
          <div className="flex items-center gap-2 text-blue-400 text-sm">
            <AlertTriangle size={16} />
            <span className="font-medium">Simulation Mode Active</span>
          </div>
          <p className="text-gray-300 text-sm mt-1">
            Set VITE_ENABLE_REAL_APIS=true and configure API keys to use real data sources.
          </p>
        </div>
      )}
    </div>
  );
}