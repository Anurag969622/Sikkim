import React, { useState } from 'react';
import { Network, TrendingUp, ExternalLink, Search } from 'lucide-react';
import { SimilarTarget } from '../types/osint';

interface SimilarityAnalysisProps {
  targets: SimilarTarget[];
  currentTarget: string;
}

export default function SimilarityAnalysis({ targets, currentTarget }: SimilarityAnalysisProps) {
  const [selectedTarget, setSelectedTarget] = useState<SimilarTarget | null>(null);
  const [expandSearch, setExpandSearch] = useState(false);

  const getSimilarityColor = (similarity: number) => {
    if (similarity >= 80) return 'text-red-400 bg-red-900/30';
    if (similarity >= 60) return 'text-yellow-400 bg-yellow-900/30';
    return 'text-green-400 bg-green-900/30';
  };

  const getSimilarityLabel = (similarity: number) => {
    if (similarity >= 80) return 'High Similarity';
    if (similarity >= 60) return 'Medium Similarity';
    return 'Low Similarity';
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-400/20 rounded-lg">
            <Network className="text-indigo-400" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Similarity Analysis</h3>
            <p className="text-gray-400 text-sm">AI-powered correlation with related targets</p>
          </div>
        </div>
        
        <button
          onClick={() => setExpandSearch(!expandSearch)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
        >
          <Search size={16} />
          Expand Search
        </button>
      </div>

      {/* Current Target */}
      <div className="mb-6 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-indigo-400 rounded-full animate-pulse"></div>
          <span className="text-white font-medium">Current Target:</span>
          <span className="text-indigo-400 font-mono">{currentTarget}</span>
        </div>
      </div>

      {/* Similar Targets */}
      <div className="space-y-4">
        <h4 className="text-white font-medium flex items-center gap-2">
          <TrendingUp size={16} className="text-green-400" />
          Top Similar Targets
        </h4>

        {targets.map((target, index) => (
          <div
            key={index}
            className="bg-gray-700/50 rounded-lg p-4 border border-gray-600 hover:bg-gray-700 transition-colors cursor-pointer"
            onClick={() => setSelectedTarget(selectedTarget?.target === target.target ? null : target)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="text-white font-mono">{target.target}</div>
                <div className={`px-2 py-1 rounded text-xs ${getSimilarityColor(target.similarity)}`}>
                  {target.similarity}% match
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm">
                  Last seen: {new Date(target.lastSeen).toLocaleDateString()}
                </span>
                <ExternalLink size={14} className="text-gray-400" />
              </div>
            </div>

            {/* Similarity Bar */}
            <div className="mb-3">
              <div className="w-full bg-gray-600 rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${
                    target.similarity >= 80 ? 'bg-red-400' :
                    target.similarity >= 60 ? 'bg-yellow-400' : 'bg-green-400'
                  }`}
                  style={{ width: `${target.similarity}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {getSimilarityLabel(target.similarity)}
              </div>
            </div>

            {/* Correlation Factors */}
            <div className="flex flex-wrap gap-2">
              {target.correlationFactors.map((factor, factorIndex) => (
                <span
                  key={factorIndex}
                  className="px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded"
                >
                  {factor}
                </span>
              ))}
            </div>

            {/* Expanded Details */}
            {selectedTarget?.target === target.target && (
              <div className="mt-4 pt-4 border-t border-gray-600">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-white font-medium mb-2">Infrastructure Patterns</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Similar hosting providers</li>
                      <li>• Comparable domain age</li>
                      <li>• Related IP ranges</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium mb-2">Behavioral Similarities</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Matching activity patterns</li>
                      <li>• Similar security posture</li>
                      <li>• Comparable risk indicators</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4 flex gap-2">
                  <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors">
                    Analyze Target
                  </button>
                  <button className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded transition-colors">
                    Add to Watchlist
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Expand Search Results */}
      {expandSearch && (
        <div className="mt-6 p-4 bg-blue-900/20 border border-blue-400/30 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Search size={16} className="text-blue-400" />
            <span className="text-blue-400 font-medium">Expanded Search Results</span>
          </div>
          <div className="space-y-2">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-gray-700/30 rounded">
                <span className="text-gray-300 font-mono">similar-target-{i + 6}.com</span>
                <span className="text-gray-400 text-sm">{Math.floor(Math.random() * 40) + 20}% match</span>
              </div>
            ))}
          </div>
          <p className="text-gray-400 text-sm mt-3">
            Expanded search includes broader correlation patterns and historical data.
          </p>
        </div>
      )}

      {/* Correlation Explanation */}
      <div className="mt-6 p-4 bg-purple-900/20 border border-purple-400/30 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Network size={16} className="text-purple-400" />
          <span className="text-purple-400 font-medium">Correlation Methodology</span>
        </div>
        <p className="text-gray-300 text-sm">
          Similarity analysis uses machine learning to identify patterns across infrastructure, 
          behavioral indicators, temporal relationships, and geographic clusters.
        </p>
      </div>
    </div>
  );
}