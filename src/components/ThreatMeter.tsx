import React, { useEffect, useState } from 'react';
import { AlertTriangle, Shield, Zap } from 'lucide-react';

interface ThreatMeterProps {
  score: number;
  animated?: boolean;
}

export default function ThreatMeter({ score, animated = true }: ThreatMeterProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (animated) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          setDisplayScore(prev => {
            if (prev >= score) {
              clearInterval(interval);
              setIsAnimating(false);
              return score;
            }
            return prev + 1;
          });
        }, 20);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setDisplayScore(score);
    }
  }, [score, animated]);

  const getThreatLevel = (score: number) => {
    if (score < 30) return { level: 'Low', color: 'green', icon: Shield };
    if (score < 70) return { level: 'Medium', color: 'yellow', icon: AlertTriangle };
    return { level: 'High', color: 'red', icon: Zap };
  };

  const threat = getThreatLevel(displayScore);
  const Icon = threat.icon;
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-32 h-32">
        {/* Background circle */}
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-700"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className={`text-${threat.color}-400 transition-all duration-1000 ease-out ${
              isAnimating ? 'animate-pulse' : ''
            }`}
            strokeLinecap="round"
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Icon 
            className={`text-${threat.color}-400 mb-1 ${isAnimating ? 'animate-bounce' : ''}`} 
            size={24} 
          />
          <div className={`text-2xl font-bold text-${threat.color}-400`}>
            {displayScore}
          </div>
          <div className="text-xs text-gray-400">/ 100</div>
        </div>
      </div>
    </div>
  );
}