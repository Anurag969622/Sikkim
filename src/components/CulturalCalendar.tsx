import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Star, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

interface CulturalCalendarProps {
  language: string;
  onBookEvent: () => void;
}

const CulturalCalendar: React.FC<CulturalCalendarProps> = ({ language, onBookEvent }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [eventFilter, setEventFilter] = useState('all');

  const translations = {
    english: {
      title: "Cultural Calendar",
      subtitle: "Discover upcoming festivals, rituals, and monastery events",
      todaysEvents: "Today's Events",
      upcomingEvents: "Upcoming Events",
      allEvents: "All Events",
      festivals: "Festivals",
      rituals: "Rituals",
      ceremonies: "Ceremonies",
      teachings: "Teachings",
      bookNow: "Book Now",
      viewDetails: "View Details",
      eventDetails: "Event Details",
      duration: "Duration",
      participants: "Expected Participants",
      monastery: "Monastery",
      time: "Time",
      description: "Description",
      requirements: "Requirements",
      closeDetails: "Close Details"
    },
    nepali: {
      title: "सांस्कृतिक पंचांग",
      subtitle: "आगामी चाडपर्व, अनुष्ठान र गुम्बाका कार्यक्रमहरू खोज्नुहोस्",
      todaysEvents: "आजका कार्यक्रमहरू",
      upcomingEvents: "आगामी कार्यक्रमहरू",
      allEvents: "सबै कार्यक्रमहरू",
      festivals: "चाडपर्वहरू",
      rituals: "अनुष्ठानहरू",
      ceremonies: "समारोहहरू",
      teachings: "शिक्षाहरू",
      bookNow: "अहिले बुक गर्नुहोस्",
      viewDetails: "विवरण हेर्नुहोस्",
      eventDetails: "कार्यक्रम विवरण",
      duration: "अवधि",
      participants: "अपेक्षित सहभागीहरू",
      monastery: "गुम्बा",
      time: "समय",
      description: "विवरण",
      requirements: "आवश्यकताहरू",
      closeDetails: "विवरण बन्द गर्नुहोस्"
    }
  };

  const t = translations[language as keyof typeof translations] || translations.english;

  const events = [
    {
      id: 1,
      title: "Losar Festival",
      type: "festivals",
      date: "2024-02-10",
      time: "06:00 AM",
      duration: "3 days",
      monastery: "Rumtek Monastery",
      expectedParticipants: 500,
      image: "https://images.pexels.com/photos/3649329/pexels-photo-3649329.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Tibetan New Year celebration with traditional dances, prayers, and cultural performances.",
      requirements: "Dress modestly, remove shoes before entering halls",
      rating: 4.9,
      isBookable: true
    },
    {
      id: 2,
      title: "Morning Prayer Ritual",
      type: "rituals",
      date: "2024-01-20",
      time: "05:30 AM",
      duration: "2 hours",
      monastery: "Pemayangtse Monastery",
      expectedParticipants: 30,
      image: "https://images.pexels.com/photos/4963435/pexels-photo-4963435.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Daily morning prayers and meditation session open to visitors.",
      requirements: "Silent participation required, arrive 15 minutes early",
      rating: 4.8,
      isBookable: true
    },
    {
      id: 3,
      title: "Cham Dance Festival",
      type: "festivals",
      date: "2024-03-15",
      time: "10:00 AM",
      duration: "6 hours",
      monastery: "Tashiding Monastery",
      expectedParticipants: 300,
      image: "https://images.pexels.com/photos/17810975/pexels-photo-17810975.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Sacred masked dance performances depicting Buddhist stories and teachings.",
      requirements: "Photography permitted in designated areas only",
      rating: 4.9,
      isBookable: true
    },
    {
      id: 4,
      title: "Dharma Teaching",
      type: "teachings",
      date: "2024-01-25",
      time: "02:00 PM",
      duration: "3 hours",
      monastery: "Enchey Monastery",
      expectedParticipants: 80,
      image: "https://images.pexels.com/photos/12879678/pexels-photo-12879678.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Buddhist philosophy and meditation instruction by senior monks.",
      requirements: "Bring notebook for taking notes, comfortable seating mat recommended",
      rating: 4.7,
      isBookable: true
    },
    {
      id: 5,
      title: "Full Moon Ceremony",
      type: "ceremonies",
      date: "2024-02-24",
      time: "07:00 PM",
      duration: "2 hours",
      monastery: "Ralang Monastery",
      expectedParticipants: 150,
      image: "https://images.pexels.com/photos/3649329/pexels-photo-3649329.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Special ceremony held during full moon with butter lamp offerings.",
      requirements: "Bring offerings if desired, maintain silence during prayers",
      rating: 4.8,
      isBookable: true
    },
    {
      id: 6,
      title: "Meditation Retreat",
      type: "teachings",
      date: "2024-04-10",
      time: "09:00 AM",
      duration: "7 days",
      monastery: "Pemayangtse Monastery",
      expectedParticipants: 25,
      image: "https://images.pexels.com/photos/4963435/pexels-photo-4963435.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Intensive meditation retreat with accommodation and meals included.",
      requirements: "Prior meditation experience preferred, vegetarian meals only",
      rating: 4.9,
      isBookable: true
    }
  ];

  const eventTypes = [
    { id: 'all', label: t.allEvents, color: 'bg-gray-500' },
    { id: 'festivals', label: t.festivals, color: 'bg-red-500' },
    { id: 'rituals', label: t.rituals, color: 'bg-blue-500' },
    { id: 'ceremonies', label: t.ceremonies, color: 'bg-purple-500' },
    { id: 'teachings', label: t.teachings, color: 'bg-green-500' }
  ];

  const filteredEvents = eventFilter === 'all' 
    ? events 
    : events.filter(event => event.type === eventFilter);

  const todayEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const today = new Date();
    return eventDate.toDateString() === today.toDateString();
  });

  const upcomingEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const today = new Date();
    return eventDate > today;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Mini Calendar */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h3>
                <div className="flex space-x-1">
                  <button
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="p-2 font-medium text-gray-500">{day}</div>
                ))}
                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                  <div key={day} className="p-2 hover:bg-monastery-primary hover:text-white rounded cursor-pointer transition-colors">
                    {day}
                  </div>
                ))}
              </div>
            </div>

            {/* Event Filters */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Event Types
              </h3>
              <div className="space-y-2">
                {eventTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setEventFilter(type.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center ${
                      eventFilter === type.id
                        ? 'bg-monastery-primary text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <div className={`w-3 h-3 ${type.color} rounded-full mr-3`}></div>
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Today's Events */}
            {todayEvents.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-gray-900 mb-4">{t.todaysEvents}</h3>
                <div className="space-y-3">
                  {todayEvents.map((event) => (
                    <div key={event.id} className="border-l-4 border-monastery-primary pl-3">
                      <h4 className="font-medium text-gray-900 text-sm">{event.title}</h4>
                      <div className="flex items-center text-xs text-gray-600 mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {event.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t.upcomingEvents}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs text-white ${
                      eventTypes.find(type => type.id === event.type)?.color
                    }`}>
                      {eventTypes.find(type => type.id === event.type)?.label}
                    </div>
                    <div className="absolute top-3 right-3 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
                      <Star className="h-3 w-3 text-monastery-gold mr-1" />
                      <span className="text-xs font-semibold">{event.rating}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-monastery-primary transition-colors">
                      {event.title}
                    </h3>
                    
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-monastery-primary" />
                        {formatDate(event.date)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-monastery-primary" />
                        {event.time} • {event.duration}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-monastery-primary" />
                        {event.monastery}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-monastery-primary" />
                        {event.expectedParticipants} expected participants
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{event.description}</p>

                    <div className="flex space-x-3">
                      <button
                        onClick={() => setSelectedEvent(event.id)}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors font-medium"
                      >
                        {t.viewDetails}
                      </button>
                      {event.isBookable && (
                        <button
                          onClick={onBookEvent}
                          className="flex-1 bg-monastery-primary hover:bg-monastery-secondary text-white py-2 px-4 rounded-lg transition-colors font-medium"
                        >
                          {t.bookNow}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No events found</h3>
                <p className="text-gray-600">Try adjusting your filter or check back later for new events</p>
              </div>
            )}
          </div>
        </div>

        {/* Event Details Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl max-h-[90vh] overflow-hidden">
              {(() => {
                const event = events.find(e => e.id === selectedEvent);
                if (!event) return null;

                return (
                  <>
                    <div className="relative">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-64 object-cover"
                      />
                      <button
                        onClick={() => setSelectedEvent(null)}
                        className="absolute top-4 right-4 bg-black bg-opacity-70 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-90"
                      >
                        ×
                      </button>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h2 className="text-2xl font-bold">{event.title}</h2>
                        <p className="text-monastery-gold">{event.monastery}</p>
                      </div>
                    </div>
                    
                    <div className="p-6 max-h-96 overflow-y-auto">
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div className="space-y-3">
                          <div className="flex items-center text-gray-600">
                            <Calendar className="h-5 w-5 mr-2 text-monastery-primary" />
                            <span>{formatDate(event.date)}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Clock className="h-5 w-5 mr-2 text-monastery-primary" />
                            <span>{event.time} • {event.duration}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Users className="h-5 w-5 mr-2 text-monastery-primary" />
                            <span>{event.expectedParticipants} {t.participants}</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center mb-2">
                            <Star className="h-5 w-5 text-monastery-gold mr-1" />
                            <span className="font-semibold">{event.rating}/5.0</span>
                          </div>
                          <div className={`inline-block px-3 py-1 rounded-full text-xs text-white ${
                            eventTypes.find(type => type.id === event.type)?.color
                          }`}>
                            {eventTypes.find(type => type.id === event.type)?.label}
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h3 className="font-semibold text-gray-900 mb-2">{t.description}</h3>
                        <p className="text-gray-600">{event.description}</p>
                      </div>

                      <div className="mb-6">
                        <h3 className="font-semibold text-gray-900 mb-2">{t.requirements}</h3>
                        <p className="text-gray-600">{event.requirements}</p>
                      </div>

                      <div className="flex space-x-3">
                        <button
                          onClick={() => setSelectedEvent(null)}
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                        >
                          {t.closeDetails}
                        </button>
                        {event.isBookable && (
                          <button
                            onClick={() => {
                              onBookEvent();
                              setSelectedEvent(null);
                            }}
                            className="flex-1 bg-monastery-primary hover:bg-monastery-secondary text-white py-2 px-4 rounded-lg transition-colors"
                          >
                            {t.bookNow}
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CulturalCalendar;