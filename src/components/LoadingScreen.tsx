import React, { useState, useEffect } from 'react';
import { Shield, Search, Database, Brain, Zap, Globe } from 'lucide-react';

interface LoadingScreenProps {
  progress: number;
  currentStep: string;
}

export default function LoadingScreen({ progress, currentStep }: LoadingScreenProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2
    }));
    setParticles(newParticles);
  }, []);

  const steps = [
    { icon: Search, label: 'Analyzing Input', description: 'Validating target and detecting type', color: 'text-blue-400' },
    { icon: Database, label: 'Querying Sources', description: 'Gathering intelligence from OSINT databases', color: 'text-purple-400' },
    { icon: Shield, label: 'Security Analysis', description: 'Checking threat indicators and vulnerabilities', color: 'text-yellow-400' },
    { icon: Brain, label: 'AI Analysis', description: 'Generating comprehensive threat assessment', color: 'text-green-400' }
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-green-400/30 rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}
      </div>

      {/* Scanning beam effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/10 to-transparent animate-pulse"></div>

      <div className="relative z-10">
        <div className="text-center mb-8">
          <div className="relative mb-4">
            <Shield className="mx-auto text-green-400 animate-spin" size={48} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border-2 border-green-400/30 rounded-full animate-ping"></div>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            OSINT Scan in Progress
          </h3>
          <p className="text-gray-400">
            Analyzing target across multiple intelligence sources...
          </p>
        </div>

        {/* Enhanced progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span className="flex items-center gap-2">
              <Zap size={16} className="text-green-400" />
              Progress
            </span>
            <span className="font-mono">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Enhanced steps */}
        <div className="space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.label;
            const isCompleted = steps.findIndex(s => s.label === currentStep) > index;
            
            return (
              <div
                key={step.label}
                className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-500 transform ${
                  isActive 
                    ? 'bg-green-900/30 border border-green-400/30 scale-105' 
                    : isCompleted 
                      ? 'bg-gray-700/50 scale-100' 
                      : 'bg-gray-700/20 scale-95'
                }`}
              >
                <div className={`p-3 rounded-lg transition-all duration-300 ${
                  isActive 
                    ? 'bg-green-400 text-black animate-pulse' 
                    : isCompleted 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-600 text-gray-300'
                }`}>
                  <Icon size={20} />
                </div>
                <div className="flex-1">
                  <div className={`font-medium transition-colors duration-300 ${
                    isActive ? 'text-green-400' : isCompleted ? 'text-green-300' : 'text-gray-400'
                  }`}>
                    {step.label}
                  </div>
                  <div className="text-sm text-gray-500">
                    {step.description}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isActive && (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-green-400 border-t-transparent"></div>
                      <div className="flex items-center gap-1">
                        <Globe size={12} className="text-green-400 animate-pulse" />
                        <span className="text-xs text-green-400 font-mono">ACTIVE</span>
                      </div>
                    </>
                  )}
                  {isCompleted && (
                    <div className="flex items-center gap-2">
                      <div className="text-green-400 text-xl">✓</div>
                      <span className="text-xs text-green-400 font-mono">DONE</span>
                    </div>
                  )}
                  {!isActive && !isCompleted && (
                    <div className="w-6 h-6 border-2 border-gray-600 rounded-full"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Real-time stats */}
        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-gray-700/30 rounded-lg">
            <div className="text-green-400 font-mono text-lg">{Math.floor(progress * 1.2)}</div>
            <div className="text-xs text-gray-400">Sources Queried</div>
          </div>
          <div className="p-3 bg-gray-700/30 rounded-lg">
            <div className="text-green-400 font-mono text-lg">{Math.floor(progress * 0.8)}</div>
            <div className="text-xs text-gray-400">Data Points</div>
          </div>
          <div className="p-3 bg-gray-700/30 rounded-lg">
            <div className="text-green-400 font-mono text-lg">{Math.floor(progress / 10)}</div>
            <div className="text-xs text-gray-400">Threats Found</div>
          </div>
        </div>
      </div>
    </div>
  );
}