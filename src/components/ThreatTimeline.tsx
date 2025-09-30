import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronRight, AlertCircle, Shield, Activity, Clock } from 'lucide-react';
import { TimelineEvent } from '../types/osint';

interface ThreatTimelineProps {
  events: TimelineEvent[];
}

export default function ThreatTimeline({ events }: ThreatTimelineProps) {
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());
  const [selectedYear, setSelectedYear] = useState<string>('all');

  const toggleEvent = (eventId: string) => {
    const newExpanded = new Set(expandedEvents);
    if (newExpanded.has(eventId)) {
      newExpanded.delete(eventId);
    } else {
      newExpanded.add(eventId);
    }
    setExpandedEvents(newExpanded);
  };

  const getEventIcon = (type: string, severity: string) => {
    switch (type) {
      case 'registration': return Shield;
      case 'breach': return AlertCircle;
      case 'malicious': return AlertCircle;
      case 'suspicious': return Activity;
      default: return Clock;
    }
  };

  const getEventColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-900/30 border-red-400/50';
      case 'warning': return 'text-yellow-400 bg-yellow-900/30 border-yellow-400/50';
      default: return 'text-blue-400 bg-blue-900/30 border-blue-400/50';
    }
  };

  const getConfidenceBadge = (confidence: string) => {
    const colors = {
      high: 'bg-green-900/30 text-green-400 border-green-400/50',
      medium: 'bg-yellow-900/30 text-yellow-400 border-yellow-400/50',
      low: 'bg-gray-700 text-gray-400 border-gray-600'
    };
    return colors[confidence as keyof typeof colors] || colors.low;
  };

  // Group events by year
  const eventsByYear = events.reduce((acc, event) => {
    const year = new Date(event.date).getFullYear().toString();
    if (!acc[year]) acc[year] = [];
    acc[year].push(event);
    return acc;
  }, {} as Record<string, TimelineEvent[]>);

  const years = Object.keys(eventsByYear).sort((a, b) => parseInt(b) - parseInt(a));
  const filteredEvents = selectedYear === 'all' ? events : eventsByYear[selectedYear] || [];

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-400/20 rounded-lg">
            <Calendar className="text-indigo-400" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Threat Intelligence Timeline</h3>
            <p className="text-gray-400 text-sm">Chronological security events and indicators</p>
          </div>
        </div>

        {/* Year Filter */}
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 outline-none"
        >
          <option value="all">All Years</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-600"></div>

        <div className="space-y-6">
          {filteredEvents.map((event, index) => {
            const Icon = getEventIcon(event.type, event.severity);
            const isExpanded = expandedEvents.has(event.id);
            const eventColor = getEventColor(event.severity);

            return (
              <div key={event.id} className="relative flex items-start gap-4">
                {/* Timeline dot */}
                <div className={`relative z-10 p-2 rounded-full border-2 ${eventColor}`}>
                  <Icon size={16} />
                </div>

                {/* Event content */}
                <div className="flex-1 min-w-0">
                  <div className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700/70 transition-colors">
                    <button
                      onClick={() => toggleEvent(event.id)}
                      className="w-full text-left"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <h4 className="font-medium text-white">{event.title}</h4>
                          <span className={`px-2 py-1 rounded text-xs border ${getConfidenceBadge(event.confidence)}`}>
                            {event.confidence.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-400">
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                          {isExpanded ? (
                            <ChevronDown size={16} className="text-gray-400" />
                          ) : (
                            <ChevronRight size={16} className="text-gray-400" />
                          )}
                        </div>
                      </div>
                    </button>

                    {/* Expanded content */}
                    <div className={`transition-all duration-300 ease-in-out ${
                      isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    } overflow-hidden`}>
                      <div className="pt-3 border-t border-gray-600">
                        <p className="text-gray-300 text-sm mb-3">{event.description}</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">Source: {event.source}</span>
                          <span className={`px-2 py-1 rounded ${
                            event.severity === 'critical' ? 'bg-red-900/30 text-red-400' :
                            event.severity === 'warning' ? 'bg-yellow-900/30 text-yellow-400' :
                            'bg-blue-900/30 text-blue-400'
                          }`}>
                            {event.severity.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-8">
          <Clock className="mx-auto text-gray-500 mb-3" size={48} />
          <p className="text-gray-400">No timeline events found for the selected period</p>
        </div>
      )}
    </div>
  );
}