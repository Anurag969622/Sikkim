import React, { useState, useEffect } from 'react';
import { Search, Target, AlertCircle, Zap, Shield, Eye } from 'lucide-react';
import { detectInputType } from '../utils/inputDetection';

interface InputSectionProps {
  onScan: (target: string, inputType: string, scanDepth: string) => void;
  isLoading: boolean;
}

export default function InputSection({ onScan, isLoading }: InputSectionProps) {
  const [target, setTarget] = useState('');
  const [detectedType, setDetectedType] = useState<string | null>(null);
  const [scanDepth, setScanDepth] = useState('standard');
  const [error, setError] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setIsTyping(true);
    const timer = setTimeout(() => {
      setIsTyping(false);
      if (target.trim()) {
        const type = detectInputType(target.trim());
        setDetectedType(type);
        setError(type ? '' : 'Invalid input format. Please enter a valid email, domain, IP address, or username.');
      } else {
        setDetectedType(null);
        setError('');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [target]);

  const handleScan = () => {
    if (!detectedType) {
      setError('Please enter a valid target to scan.');
      return;
    }
    onScan(target.trim(), detectedType, scanDepth);
  };

  const getTypeDescription = (type: string | null) => {
    switch (type) {
      case 'email': return 'Email Address - Will check breaches, reputation, and risk factors';
      case 'domain': return 'Domain Name - Will analyze WHOIS, security scans, and infrastructure';
      case 'ip': return 'IP Address - Will check geolocation, abuse reports, and organization info';
      case 'username': return 'Username - Will search across social platforms and paste sites';
      default: return 'Enter your target to automatically detect the type';
    }
  };

  const getTypeIcon = (type: string | null) => {
    switch (type) {
      case 'email': return '📧';
      case 'domain': return '🌐';
      case 'ip': return '🖥️';
      case 'username': return '👤';
      default: return '🎯';
    }
  };

  const scanOptions = [
    { 
      value: 'quick', 
      label: 'Quick', 
      desc: 'Basic checks',
      icon: Zap,
      time: '~30s',
      color: 'text-blue-400'
    },
    { 
      value: 'standard', 
      label: 'Standard', 
      desc: 'Comprehensive',
      icon: Shield,
      time: '~2m',
      color: 'text-green-400'
    },
    { 
      value: 'deep', 
      label: 'Deep', 
      desc: 'All sources',
      icon: Eye,
      time: '~5m',
      color: 'text-purple-400'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border border-gray-700 relative overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/5 to-transparent animate-pulse"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-400/20 rounded-lg">
            <Target className="text-green-400" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Target Input</h2>
            <p className="text-gray-400 text-sm">Enter any target for comprehensive OSINT analysis</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Target (Email, Domain, IP, or Username)
            </label>
            <div className="relative">
              <input
                type="text"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="example@domain.com, google.com, 8.8.8.8, or username"
                className="w-full px-4 py-4 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 outline-none transition-all duration-200"
                disabled={isLoading}
              />
              <div className="absolute right-4 top-4 flex items-center gap-2">
                {isTyping && (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-green-400 border-t-transparent"></div>
                )}
                <Search className="text-gray-400" size={20} />
              </div>
            </div>
          </div>

          {detectedType && (
            <div className="p-4 bg-green-900/20 border border-green-400/30 rounded-lg transform transition-all duration-300 animate-in slide-in-from-top">
              <div className="flex items-center gap-3 text-green-400 text-sm font-medium mb-2">
                <span className="text-lg">{getTypeIcon(detectedType)}</span>
                <Target size={16} />
                <span>Detected: {detectedType.toUpperCase()}</span>
                <div className="ml-auto px-2 py-1 bg-green-400/20 rounded text-xs">VALID</div>
              </div>
              <p className="text-gray-300 text-sm">
                {getTypeDescription(detectedType)}
              </p>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-900/20 border border-red-400/30 rounded-lg transform transition-all duration-300 animate-in slide-in-from-top">
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle size={16} />
                {error}
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Scan Depth
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {scanOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() => setScanDepth(option.value)}
                    className={`p-4 rounded-lg border text-left transition-all duration-200 transform hover:scale-105 ${
                      scanDepth === option.value
                        ? 'bg-green-600 border-green-500 text-white shadow-lg shadow-green-600/20'
                        : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:border-gray-500'
                    }`}
                    disabled={isLoading}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Icon size={18} className={scanDepth === option.value ? 'text-white' : option.color} />
                      <div className="font-medium">{option.label}</div>
                      <div className="ml-auto text-xs opacity-75">{option.time}</div>
                    </div>
                    <div className="text-xs opacity-75">{option.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleScan}
            disabled={!detectedType || isLoading}
            className="w-full py-4 px-6 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-3 transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-green-600/20"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span>Scanning...</span>
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </>
            ) : (
              <>
                <Search size={20} />
                <span>Start OSINT Scan</span>
                <div className="ml-auto text-xs opacity-75">
                  {detectedType && `${detectedType.toUpperCase()} • ${scanOptions.find(o => o.value === scanDepth)?.time}`}
                </div>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}