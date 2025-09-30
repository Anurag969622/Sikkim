import React, { useState } from 'react';
import { MapPin, Filter, Route, Car, Mountain, Clock, Star } from 'lucide-react';

interface InteractiveMapProps {
  language: string;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ language }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedMonastery, setSelectedMonastery] = useState<number | null>(null);
  const [showRoutes, setShowRoutes] = useState(false);

  const translations = {
    english: {
      title: "Interactive Monastery Map",
      subtitle: "Discover monasteries across Sikkim with travel routes and nearby attractions",
      filters: "Filters",
      all: "All",
      nyingma: "Nyingma",
      kagyu: "Kagyu",
      sakya: "Sakya",
      gelug: "Gelug",
      showRoutes: "Show Routes",
      hideRoutes: "Hide Routes",
      nearbyAttractions: "Nearby Attractions",
      travelTime: "Travel Time",
      difficulty: "Difficulty",
      altitude: "Altitude",
      getDirections: "Get Directions",
      bookTour: "Book Tour"
    },
    nepali: {
      title: "अन्तरक्रियात्मक गुम्बा नक्सा",
      subtitle: "यात्रा मार्गहरू र नजिकैका आकर्षणहरूसहित सिक्किमभरका गुम्बाहरू खोज्नुहोस्",
      filters: "फिल्टरहरू",
      all: "सबै",
      nyingma: "न्यिङमा",
      kagyu: "काग्यु",
      sakya: "साक्य",
      gelug: "गेलुग",
      showRoutes: "मार्गहरू देखाउनुहोस्",
      hideRoutes: "मार्गहरू लुकाउनुहोस्",
      nearbyAttractions: "नजिकैका आकर्षणहरू",
      travelTime: "यात्रा समय",
      difficulty: "कठिनाई",
      altitude: "उचाइ",
      getDirections: "दिशाहरू लिनुहोस्",
      bookTour: "टुर बुक गर्नुहोस्"
    }
  };

  const t = translations[language as keyof typeof translations] || translations.english;

  const monasteries = [
    {
      id: 1,
      name: "Rumtek Monastery",
      tradition: "kagyu",
      location: "East Sikkim",
      coordinates: { x: 65, y: 45 },
      altitude: "5,800 ft",
      travelTime: "45 min",
      difficulty: "Easy",
      rating: 4.9,
      image: "https://images.pexels.com/photos/3649329/pexels-photo-3649329.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "The largest monastery in Sikkim and seat of the Karmapa",
      nearbyAttractions: ["Tsurphu Temple", "Seti River", "Rumtek Village"]
    },
    {
      id: 2,
      name: "Pemayangtse Monastery",
      tradition: "nyingma",
      location: "West Sikkim",
      coordinates: { x: 25, y: 35 },
      altitude: "7,000 ft",
      travelTime: "2.5 hrs",
      difficulty: "Moderate",
      rating: 4.8,
      image: "https://images.pexels.com/photos/4963435/pexels-photo-4963435.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "One of the oldest and most important monasteries in Sikkim",
      nearbyAttractions: ["Khecheopalri Lake", "Pelling", "Sangachoeling Monastery"]
    },
    {
      id: 3,
      name: "Tashiding Monastery",
      tradition: "nyingma",
      location: "West Sikkim",
      coordinates: { x: 30, y: 50 },
      altitude: "4,600 ft",
      travelTime: "3 hrs",
      difficulty: "Moderate",
      rating: 4.7,
      image: "https://images.pexels.com/photos/17810975/pexels-photo-17810975.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "Sacred hilltop monastery with panoramic mountain views",
      nearbyAttractions: ["Tashiding Village", "Rathong River", "Yuksom"]
    },
    {
      id: 4,
      name: "Enchey Monastery",
      tradition: "nyingma",
      location: "East Sikkim",
      coordinates: { x: 55, y: 40 },
      altitude: "6,200 ft",
      travelTime: "20 min",
      difficulty: "Easy",
      rating: 4.6,
      image: "https://images.pexels.com/photos/12879678/pexels-photo-12879678.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "Historic monastery overlooking Gangtok city",
      nearbyAttractions: ["Gangtok City", "Tsomgo Lake", "Baba Mandir"]
    },
    {
      id: 5,
      name: "Ralang Monastery",
      tradition: "kagyu",
      location: "South Sikkim",
      coordinates: { x: 45, y: 70 },
      altitude: "5,500 ft",
      travelTime: "1.5 hrs",
      difficulty: "Easy",
      rating: 4.5,
      image: "https://images.pexels.com/photos/3649329/pexels-photo-3649329.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "Beautiful monastery known for its annual Cham dance",
      nearbyAttractions: ["Ravangla", "Buddha Park", "Maenam Wildlife Sanctuary"]
    }
  ];

  const filteredMonasteries = selectedFilter === 'all' 
    ? monasteries 
    : monasteries.filter(monastery => monastery.tradition === selectedFilter);

  const filters = [
    { id: 'all', label: t.all, color: 'bg-gray-500' },
    { id: 'nyingma', label: t.nyingma, color: 'bg-red-500' },
    { id: 'kagyu', label: t.kagyu, color: 'bg-blue-500' },
    { id: 'sakya', label: t.sakya, color: 'bg-yellow-500' },
    { id: 'gelug', label: t.gelug, color: 'bg-purple-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters and Info Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.filters}</h3>
              <div className="space-y-2">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center ${
                      selectedFilter === filter.id
                        ? 'bg-monastery-primary text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <div className={`w-3 h-3 ${filter.color} rounded-full mr-3`}></div>
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Route Controls */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <button
                onClick={() => setShowRoutes(!showRoutes)}
                className={`w-full px-4 py-3 rounded-lg transition-colors flex items-center justify-center ${
                  showRoutes
                    ? 'bg-monastery-primary text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <Route className="h-5 w-5 mr-2" />
                {showRoutes ? t.hideRoutes : t.showRoutes}
              </button>
            </div>

            {/* Selected Monastery Info */}
            {selectedMonastery && (
              <div className="bg-white rounded-lg p-6 shadow-md">
                {(() => {
                  const monastery = monasteries.find(m => m.id === selectedMonastery);
                  if (!monastery) return null;
                  
                  return (
                    <>
                      <img
                        src={monastery.image}
                        alt={monastery.name}
                        className="w-full h-32 object-cover rounded-lg mb-4"
                      />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{monastery.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{monastery.description}</p>
                      
                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-gray-500" />
                          <span>{t.travelTime}: {monastery.travelTime}</span>
                        </div>
                        <div className="flex items-center">
                          <Mountain className="h-4 w-4 mr-2 text-gray-500" />
                          <span>{t.altitude}: {monastery.altitude}</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-2 text-monastery-gold" />
                          <span>{monastery.rating}/5.0</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">{t.nearbyAttractions}</h4>
                        <div className="space-y-1">
                          {monastery.nearbyAttractions.map((attraction, index) => (
                            <div key={index} className="text-sm text-gray-600">
                              • {attraction}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <button className="w-full bg-monastery-primary hover:bg-monastery-secondary text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center">
                          <Car className="h-4 w-4 mr-2" />
                          {t.getDirections}
                        </button>
                        <button className="w-full border border-monastery-primary text-monastery-primary hover:bg-monastery-primary hover:text-white py-2 px-4 rounded-lg transition-colors">
                          {t.bookTour}
                        </button>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}
          </div>

          {/* Interactive Map */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Map Container */}
              <div className="relative h-96 lg:h-[600px] bg-gradient-to-br from-green-100 to-blue-100">
                {/* Background Map Illustration */}
                <div className="absolute inset-0">
                  {/* Mountain ranges */}
                  <svg className="w-full h-full opacity-30" viewBox="0 0 400 300">
                    <polygon points="0,250 50,150 100,200 150,100 200,180 250,80 300,160 350,120 400,200 400,300 0,300" fill="#8B7355" />
                    <polygon points="0,200 80,120 160,160 240,60 320,140 400,100 400,300 0,300" fill="#A0956B" />
                  </svg>
                  
                  {/* Rivers */}
                  <svg className="w-full h-full opacity-40" viewBox="0 0 400 300">
                    <path d="M 50,200 Q 150,180 250,220 Q 300,230 400,200" stroke="#3B82F6" strokeWidth="3" fill="none" />
                    <path d="M 0,150 Q 100,140 200,160 Q 250,165 300,150" stroke="#3B82F6" strokeWidth="2" fill="none" />
                  </svg>
                </div>

                {/* Travel Routes */}
                {showRoutes && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#F59E0B" />
                      </marker>
                    </defs>
                    {filteredMonasteries.map((monastery, index) => {
                      if (index === 0) return null;
                      const prev = filteredMonasteries[index - 1];
                      return (
                        <line
                          key={`route-${monastery.id}`}
                          x1={`${prev.coordinates.x}%`}
                          y1={`${prev.coordinates.y}%`}
                          x2={`${monastery.coordinates.x}%`}
                          y2={`${monastery.coordinates.y}%`}
                          stroke="#F59E0B"
                          strokeWidth="2"
                          strokeDasharray="5,5"
                          markerEnd="url(#arrowhead)"
                        />
                      );
                    })}
                  </svg>
                )}

                {/* Monastery Markers */}
                {filteredMonasteries.map((monastery) => (
                  <div
                    key={monastery.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                    style={{
                      left: `${monastery.coordinates.x}%`,
                      top: `${monastery.coordinates.y}%`
                    }}
                    onClick={() => setSelectedMonastery(monastery.id)}
                  >
                    {/* Marker */}
                    <div className={`w-8 h-8 rounded-full border-3 border-white shadow-lg transform group-hover:scale-125 transition-transform ${
                      monastery.tradition === 'nyingma' ? 'bg-red-500' :
                      monastery.tradition === 'kagyu' ? 'bg-blue-500' :
                      monastery.tradition === 'sakya' ? 'bg-yellow-500' :
                      'bg-purple-500'
                    }`}>
                      <div className="w-full h-full flex items-center justify-center">
                        <MapPin className="h-4 w-4 text-white" />
                      </div>
                    </div>

                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div className="bg-black bg-opacity-80 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap">
                        <div className="font-semibold">{monastery.name}</div>
                        <div className="text-xs">{monastery.location}</div>
                        <div className="flex items-center mt-1">
                          <Star className="h-3 w-3 text-monastery-gold mr-1" />
                          <span className="text-xs">{monastery.rating}</span>
                        </div>
                      </div>
                      <div className="w-2 h-2 bg-black bg-opacity-80 transform rotate-45 mx-auto -mt-1"></div>
                    </div>

                    {/* Selection Ring */}
                    {selectedMonastery === monastery.id && (
                      <div className="absolute inset-0 w-8 h-8 border-2 border-monastery-gold rounded-full animate-ping"></div>
                    )}
                  </div>
                ))}

                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-4 shadow-md">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Legend</h4>
                  <div className="space-y-1">
                    {filters.slice(1).map((filter) => (
                      <div key={filter.id} className="flex items-center text-xs">
                        <div className={`w-3 h-3 ${filter.color} rounded-full mr-2`}></div>
                        <span className="text-gray-700">{filter.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Map Controls */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  <button className="bg-white hover:bg-gray-50 p-2 rounded-lg shadow-md transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                  <button className="bg-white hover:bg-gray-50 p-2 rounded-lg shadow-md transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Map Statistics */}
              <div className="p-4 bg-gray-50 border-t">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-monastery-primary">{filteredMonasteries.length}</div>
                    <div className="text-sm text-gray-600">Monasteries</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-monastery-primary">4</div>
                    <div className="text-sm text-gray-600">Districts</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-monastery-primary">12</div>
                    <div className="text-sm text-gray-600">Routes</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-monastery-primary">25+</div>
                    <div className="text-sm text-gray-600">Attractions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;