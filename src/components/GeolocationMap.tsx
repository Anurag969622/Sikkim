import React from 'react';
import { MapPin, Globe, Shield, AlertTriangle, Building, Mail } from 'lucide-react';
import { GeolocationData } from '../types/osint';

interface GeolocationMapProps {
  data: GeolocationData;
}

export default function GeolocationMap({ data }: GeolocationMapProps) {
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high': return 'text-red-400 bg-red-900/30 border-red-400/50';
      case 'medium': return 'text-yellow-400 bg-yellow-900/30 border-yellow-400/50';
      default: return 'text-green-400 bg-green-900/30 border-green-400/50';
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high': return AlertTriangle;
      case 'medium': return Shield;
      default: return Shield;
    }
  };

  const RiskIcon = getRiskIcon(data.riskLevel);

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-400/20 rounded-lg">
          <MapPin className="text-green-400" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Geolocation Intelligence</h3>
          <p className="text-gray-400 text-sm">Geographic and organizational information</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map Placeholder */}
        <div className="bg-gray-700/50 rounded-lg p-6 border border-gray-600">
          <div className="aspect-video bg-gray-600 rounded-lg flex items-center justify-center mb-4 relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-green-900/20 animate-pulse"></div>
            
            {/* Map placeholder content */}
            <div className="relative z-10 text-center">
              <Globe className="mx-auto text-blue-400 mb-2" size={48} />
              <p className="text-gray-300 text-sm">Interactive Map</p>
              <p className="text-gray-400 text-xs">
                {data.latitude.toFixed(4)}, {data.longitude.toFixed(4)}
              </p>
            </div>

            {/* Animated pin */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-red-600 rounded-full"></div>
            </div>
          </div>

          {/* Coordinates */}
          <div className="text-center">
            <div className="text-sm text-gray-400">Coordinates</div>
            <div className="text-white font-mono">
              {data.latitude.toFixed(6)}, {data.longitude.toFixed(6)}
            </div>
          </div>
        </div>

        {/* Location Details */}
        <div className="space-y-4">
          {/* Country & Flag */}
          <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{data.flag}</span>
              <div>
                <div className="text-white font-medium">{data.country}</div>
                <div className="text-gray-400 text-sm">{data.countryCode}</div>
              </div>
            </div>
            {data.city && (
              <div className="text-sm">
                <span className="text-gray-400">City: </span>
                <span className="text-white">{data.city}</span>
                {data.region && (
                  <>
                    <span className="text-gray-400">, </span>
                    <span className="text-white">{data.region}</span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Organization */}
          <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center gap-2 mb-2">
              <Building size={16} className="text-blue-400" />
              <span className="text-white font-medium">Organization</span>
            </div>
            <div className="text-gray-300 text-sm">{data.organization}</div>
            <div className="text-gray-400 text-xs mt-1">ASN: {data.asn}</div>
          </div>

          {/* Risk Assessment */}
          <div className={`rounded-lg p-4 border ${getRiskColor(data.riskLevel)}`}>
            <div className="flex items-center gap-2 mb-2">
              <RiskIcon size={16} />
              <span className="font-medium">Geographic Risk Level</span>
            </div>
            <div className="text-sm opacity-90">
              {data.riskLevel.charAt(0).toUpperCase() + data.riskLevel.slice(1)} risk based on location
            </div>
          </div>

          {/* Abuse Contact */}
          {data.abuseContact && (
            <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
              <div className="flex items-center gap-2 mb-2">
                <Mail size={16} className="text-orange-400" />
                <span className="text-white font-medium">Abuse Contact</span>
              </div>
              <div className="text-gray-300 text-sm font-mono">{data.abuseContact}</div>
            </div>
          )}
        </div>
      </div>

      {/* Fallback Notice */}
      <div className="mt-4 p-3 bg-blue-900/20 border border-blue-400/30 rounded-lg">
        <div className="flex items-center gap-2 text-blue-400 text-sm">
          <Globe size={16} />
          <span className="font-medium">Geolocation Data</span>
        </div>
        <p className="text-gray-300 text-sm mt-1">
          Location data provided by MaxMind GeoIP2. Accuracy may vary for mobile and VPN connections.
        </p>
      </div>
    </div>
  );
}