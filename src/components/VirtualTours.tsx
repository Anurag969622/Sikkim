import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Eye, Headphones } from 'lucide-react';

interface VirtualToursProps {
  language: string;
}

const VirtualTours: React.FC<VirtualToursProps> = ({ language }) => {
  const [selectedTour, setSelectedTour] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVRMode, setIsVRMode] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState('main-hall');

  const translations = {
    english: {
      title: "Virtual 360° Tours",
      subtitle: "Immerse yourself in the sacred spaces of Sikkim's monasteries",
      playTour: "Play Tour",
      pauseTour: "Pause Tour",
      vrMode: "VR Mode",
      normalView: "Normal View",
      audioNarration: "Audio Narration",
      selectRoom: "Select Room",
      mainHall: "Main Hall",
      prayerWheel: "Prayer Wheel",
      library: "Library",
      garden: "Garden",
      viewDetails: "View Details"
    },
    nepali: {
      title: "भर्चुअल ३६०° टुर",
      subtitle: "सिक्किमका गुम्बाहरूको पवित्र स्थानहरूमा डुब्नुहोस्",
      playTour: "टुर सुरु गर्नुहोस्",
      pauseTour: "टुर रोक्नुहोस्",
      vrMode: "VR मोड",
      normalView: "सामान्य दृश्य",
      audioNarration: "अडियो वर्णन",
      selectRoom: "कोठा छान्नुहोस्",
      mainHall: "मुख्य हल",
      prayerWheel: "प्रार्थना चक्र",
      library: "पुस्तकालय",
      garden: "बगैंचा",
      viewDetails: "विवरण हेर्नुहोस्"
    }
  };

  const t = translations[language as keyof typeof translations] || translations.english;

  const tours = [
    {
      id: 0,
      name: "Rumtek Monastery",
      location: "East Sikkim",
      image: "https://images.pexels.com/photos/3649329/pexels-photo-3649329.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "12 min",
      rooms: [
        { id: 'main-hall', name: t.mainHall, image: "https://images.pexels.com/photos/4963435/pexels-photo-4963435.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { id: 'prayer-wheel', name: t.prayerWheel, image: "https://images.pexels.com/photos/17810975/pexels-photo-17810975.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { id: 'library', name: t.library, image: "https://images.pexels.com/photos/12879678/pexels-photo-12879678.jpeg?auto=compress&cs=tinysrgb&w=400" }
      ]
    },
    {
      id: 1,
      name: "Pemayangtse Monastery",
      location: "West Sikkim",
      image: "https://images.pexels.com/photos/4963435/pexels-photo-4963435.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "15 min",
      rooms: [
        { id: 'main-hall', name: t.mainHall, image: "https://images.pexels.com/photos/3649329/pexels-photo-3649329.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { id: 'garden', name: t.garden, image: "https://images.pexels.com/photos/17810975/pexels-photo-17810975.jpeg?auto=compress&cs=tinysrgb&w=400" }
      ]
    },
    {
      id: 2,
      name: "Tashiding Monastery",
      location: "West Sikkim",
      image: "https://images.pexels.com/photos/17810975/pexels-photo-17810975.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "10 min",
      rooms: [
        { id: 'main-hall', name: t.mainHall, image: "https://images.pexels.com/photos/12879678/pexels-photo-12879678.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { id: 'prayer-wheel', name: t.prayerWheel, image: "https://images.pexels.com/photos/4963435/pexels-photo-4963435.jpeg?auto=compress&cs=tinysrgb&w=400" }
      ]
    }
  ];

  const currentTour = tours[selectedTour];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Tour Selection Sidebar */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Monastery</h3>
            <div className="space-y-4">
              {tours.map((tour) => (
                <div
                  key={tour.id}
                  onClick={() => setSelectedTour(tour.id)}
                  className={`cursor-pointer rounded-lg p-4 transition-all ${
                    selectedTour === tour.id
                      ? 'bg-monastery-primary text-white shadow-lg'
                      : 'bg-white hover:bg-gray-50 shadow-md'
                  }`}
                >
                  <img
                    src={tour.image}
                    alt={tour.name}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h4 className="font-semibold">{tour.name}</h4>
                  <p className={`text-sm ${selectedTour === tour.id ? 'text-monastery-gold' : 'text-gray-600'}`}>
                    {tour.location} • {tour.duration}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Main Tour Viewer */}
          <div className="lg:col-span-3">
            {/* Virtual Tour Window */}
            <div className="bg-black rounded-2xl overflow-hidden shadow-2xl relative">
              <div className="aspect-video bg-gradient-to-br from-monastery-primary to-monastery-secondary flex items-center justify-center relative">
                {/* 360° View Simulation */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-80"
                  style={{ backgroundImage: `url(${currentTour.rooms.find(room => room.id === selectedRoom)?.image})` }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                </div>
                
                {/* VR Mode Overlay */}
                {isVRMode && (
                  <div className="absolute inset-0 flex">
                    <div className="w-1/2 border-r border-white border-opacity-30"></div>
                    <div className="w-1/2"></div>
                  </div>
                )}

                {/* Navigation Hotspots */}
                <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-monastery-gold rounded-full animate-pulse cursor-pointer hover:scale-110 transition-transform">
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 hover:opacity-100">
                    Buddha Statue
                  </div>
                </div>
                <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-monastery-gold rounded-full animate-pulse cursor-pointer hover:scale-110 transition-transform">
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 hover:opacity-100">
                    Prayer Wheels
                  </div>
                </div>

                {/* Center Play Button */}
                {!isPlaying && (
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-6 shadow-xl transform hover:scale-105 transition-all"
                  >
                    <Play className="h-12 w-12 text-monastery-primary ml-1" />
                  </button>
                )}
              </div>

              {/* Controls */}
              <div className="bg-black bg-opacity-90 text-white p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                    >
                      {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                    </button>
                    
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                    >
                      {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                    </button>

                    <div className="flex items-center space-x-2">
                      <Headphones className="h-5 w-5" />
                      <span className="text-sm">{t.audioNarration}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setIsVRMode(!isVRMode)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        isVRMode ? 'bg-monastery-primary text-white' : 'bg-white bg-opacity-20 hover:bg-opacity-30'
                      }`}
                    >
                      <Eye className="h-5 w-5 inline mr-2" />
                      {isVRMode ? t.normalView : t.vrMode}
                    </button>

                    <button className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors">
                      <RotateCcw className="h-6 w-6" />
                    </button>

                    <button className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors">
                      <Maximize className="h-6 w-6" />
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="w-full bg-white bg-opacity-30 rounded-full h-2">
                    <div className="bg-monastery-gold h-2 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                  <div className="flex justify-between text-sm mt-2 text-gray-300">
                    <span>4:20</span>
                    <span>{currentTour.duration}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Room Selection */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.selectRoom}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {currentTour.rooms.map((room) => (
                  <div
                    key={room.id}
                    onClick={() => setSelectedRoom(room.id)}
                    className={`cursor-pointer rounded-lg overflow-hidden shadow-md transition-all ${
                      selectedRoom === room.id
                        ? 'ring-2 ring-monastery-primary shadow-lg'
                        : 'hover:shadow-lg'
                    }`}
                  >
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-24 object-cover"
                    />
                    <div className="p-3 bg-white">
                      <h4 className={`text-sm font-medium ${
                        selectedRoom === room.id ? 'text-monastery-primary' : 'text-gray-900'
                      }`}>
                        {room.name}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tour Information */}
            <div className="mt-8 bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{currentTour.name}</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">About this Monastery</h4>
                  <p className="text-gray-600 mb-4">
                    Built in the 16th century, this monastery is one of the most significant Buddhist centers in Sikkim. 
                    It houses ancient scriptures, intricate murals, and serves as a center for Buddhist learning.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Founded:</span> 1547 CE</div>
                    <div><span className="font-medium">Tradition:</span> Kagyu School</div>
                    <div><span className="font-medium">Altitude:</span> 5,800 ft</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Virtual Tour Features</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-monastery-gold rounded-full mr-2"></div>
                      360° panoramic views
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-monastery-gold rounded-full mr-2"></div>
                      Interactive hotspots
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-monastery-gold rounded-full mr-2"></div>
                      Multilingual narration
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-monastery-gold rounded-full mr-2"></div>
                      VR mode support
                    </div>
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

export default VirtualTours;