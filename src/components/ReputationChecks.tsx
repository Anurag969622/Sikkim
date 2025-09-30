import React, { useState } from 'react';
import { ExternalLink, Shield, Search, Globe, AlertTriangle, Clock } from 'lucide-react';

interface ReputationChecksProps {
  target: string;
  inputType: string;
}

interface ReputationService {
  name: string;
  description: string;
  url: string;
  icon: React.ComponentType<any>;
  color: string;
  rateLimited?: boolean;
}

export default function ReputationChecks({ target, inputType }: ReputationChecksProps) {
  const [rateLimits, setRateLimits] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<Set<string>>(new Set());

  const getServices = (): ReputationService[] => {
    const baseServices = [
      {
        name: 'VirusTotal',
        description: 'Comprehensive malware and URL analysis',
        url: `https://www.virustotal.com/gui/search/${encodeURIComponent(target)}`,
        icon: Shield,
        color: 'bg-blue-600 hover:bg-blue-700'
      },
      {
        name: 'Shodan',
        description: 'Internet-connected device search engine',
        url: `https://www.shodan.io/search?query=${encodeURIComponent(target)}`,
        icon: Search,
        color: 'bg-red-600 hover:bg-red-700'
      }
    ];

    if (inputType === 'domain' || inputType === 'ip') {
      baseServices.push({
        name: 'WHOIS Lookup',
        description: 'Domain registration and ownership information',
        url: `https://whois.domaintools.com/${encodeURIComponent(target)}`,
        icon: Globe,
        color: 'bg-green-600 hover:bg-green-700'
      });
    }

    if (inputType === 'ip') {
      baseServices.push({
        name: 'AbuseIPDB',
        description: 'IP address abuse and reputation database',
        url: `https://www.abuseipdb.com/check/${encodeURIComponent(target)}`,
        icon: AlertTriangle,
        color: 'bg-orange-600 hover:bg-orange-700'
      });
    }

    return baseServices;
  };

  const handleServiceClick = async (service: ReputationService) => {
    // Simulate rate limiting check
    if (rateLimits.has(service.name)) {
      return;
    }

    setLoading(prev => new Set([...prev, service.name]));

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate rate limiting (10% chance)
    if (Math.random() < 0.1) {
      setRateLimits(prev => new Set([...prev, service.name]));
      setTimeout(() => {
        setRateLimits(prev => {
          const newSet = new Set(prev);
          newSet.delete(service.name);
          return newSet;
        });
      }, 30000); // 30 second cooldown
    } else {
      window.open(service.url, '_blank', 'noopener,noreferrer');
    }

    setLoading(prev => {
      const newSet = new Set(prev);
      newSet.delete(service.name);
      return newSet;
    });
  };

  const services = getServices();

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-400/20 rounded-lg">
          <ExternalLink className="text-purple-400" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">External Reputation Checks</h3>
          <p className="text-gray-400 text-sm">Verify findings with trusted security services</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((service) => {
          const Icon = service.icon;
          const isRateLimited = rateLimits.has(service.name);
          const isLoading = loading.has(service.name);

          return (
            <div key={service.name} className="relative group">
              <button
                onClick={() => handleServiceClick(service)}
                disabled={isRateLimited || isLoading}
                className={`w-full p-4 rounded-lg border text-left transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isRateLimited 
                    ? 'bg-gray-700 border-gray-600 text-gray-400'
                    : `${service.color} border-transparent text-white shadow-lg`
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                  ) : isRateLimited ? (
                    <Clock size={20} className="text-gray-400" />
                  ) : (
                    <Icon size={20} />
                  )}
                  <div className="font-medium">{service.name}</div>
                  {!isRateLimited && !isLoading && (
                    <ExternalLink size={14} className="ml-auto opacity-75" />
                  )}
                </div>
                <div className="text-xs opacity-75">
                  {isRateLimited ? 'Rate limited - please wait' : service.description}
                </div>
              </button>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                {isRateLimited ? 'Service temporarily unavailable' : `Open ${service.name} in new tab`}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-blue-900/20 border border-blue-400/30 rounded-lg">
        <div className="flex items-center gap-2 text-blue-400 text-sm">
          <AlertTriangle size={16} />
          <span className="font-medium">Rate Limiting Notice</span>
        </div>
        <p className="text-gray-300 text-sm mt-1">
          External services may have rate limits. If a service becomes unavailable, please wait before retrying.
        </p>
      </div>
    </div>
  );
}