import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Download, MapPin, Clock, Headphones, Wifi, WifiOff } from 'lucide-react';

interface AudioGuideProps {
  language: string;
}

const AudioGuide: React.FC<AudioGuideProps> = ({ language }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(75);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [progress, setProgress] = useState(30);

  const translations = {
    english: {
      title: "Smart Audio Guide",
      subtitle: "GPS-based narrated experiences with offline capabilities",
      currentlyPlaying: "Currently Playing",
      offlineMode: "Offline Mode",
      onlineMode: "Online Mode",
      downloadForOffline: "Download for Offline",
      playlistTitle: "Audio Tours",
      duration: "Duration",
      location: "Location",
      narrator: "Narrator",
      description: "Description",
      play: "Play",
      pause: "Pause",
      volume: "Volume"
    },
    nepali: {
      title: "स्मार्ट अडियो गाइड",
      subtitle: "अफलाइन क्षमताहरूसहित GPS आधारित वर्णनात्मक अनुभवहरू",
      currentlyPlaying: "हाल बजिरहेको",
      offlineMode: "अफलाइन मोड",
      onlineMode: "अनलाइन मोड",
      downloadForOffline: "अफलाइनको लागि डाउनलोड गर्नुहोस्",
      playlistTitle: "अडियो टुरहरू",
      duration: "अवधि",
      location: "स्थान",
      narrator: "वर्णनकर्ता",
      description: "विवरण",
      play: "बजाउनुहोस्",
      pause: "रोक्नुहोस्",
      volume: "आवाज"
    }
  };

  const t = translations[language as keyof typeof translations] || translations.english;

  const audioTracks = [
    {
      id: 1,
      title: "Welcome to Rumtek Monastery",
      monastery: "Rumtek Monastery",
      duration: "5:30",
      narrator: "Lama Tenzin",
      description: "Introduction to the largest monastery in Sikkim and seat of the Karmapa",
      location: "Main Entrance",
      image: "https://images.pexels.com/photos/3649329/pexels-photo-3649329.jpeg?auto=compress&cs=tinysrgb&w=300",
      isDownloaded: true
    },
    {
      id: 2,
      title: "The Golden Stupa",
      monastery: "Rumtek Monastery",
      duration: "8:15",
      narrator: "Dr. Pemba Sherpa",
      description: "History and significance of the golden stupa and its relics",
      location: "Main Hall",
      image: "https://images.pexels.com/photos/4963435/pexels-photo-4963435.jpeg?auto=compress&cs=tinysrgb&w=300",
      isDownloaded: true
    },
    {
      id: 3,
      title: "Prayer Wheels and Mantras",
      monastery: "Rumtek Monastery",
      duration: "6:45",
      narrator: "Ani Dolma",
      description: "Understanding the spiritual significance of prayer wheels",
      location: "Courtyard",
      image: "https://images.pexels.com/photos/17810975/pexels-photo-17810975.jpeg?auto=compress&cs=tinysrgb&w=300",
      isDownloaded: false
    },
    {
      id: 4,
      title: "Pemayangtse Origins",
      monastery: "Pemayangtse Monastery",
      duration: "12:20",
      narrator: "Lama Norbu",
      description: "The founding story and early history of Pemayangtse",
      location: "Assembly Hall",
      image: "https://images.pexels.com/photos/12879678/pexels-photo-12879678.jpeg?auto=compress&cs=tinysrgb&w=300",
      isDownloaded: false
    },
    {
      id: 5,
      title: "Sacred Art and Murals",
      monastery: "Tashiding Monastery",
      duration: "9:30",
      narrator: "Art Historian Maya Gurung",
      description: "Detailed exploration of ancient murals and their symbolism",
      location: "Art Gallery",
      image: "https://images.pexels.com/photos/3649329/pexels-photo-3649329.jpeg?auto=compress&cs=tinysrgb&w=300",
      isDownloaded: true
    }
  ];

  const currentAudio = audioTracks[currentTrack];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Audio Player */}
          <div className="lg:col-span-2">
            {/* Now Playing Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
              <div className="relative">
                <img
                  src={currentAudio.image}
                  alt={currentAudio.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm opacity-90">{t.currentlyPlaying}</p>
                  <h2 className="text-2xl font-bold">{currentAudio.title}</h2>
                  <p className="text-monastery-gold">{currentAudio.monastery}</p>
                </div>
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => setIsOfflineMode(!isOfflineMode)}
                    className={`px-3 py-1 rounded-full text-sm flex items-center ${
                      isOfflineMode
                        ? 'bg-green-500 text-white'
                        : 'bg-white bg-opacity-20 text-white backdrop-blur-sm'
                    }`}
                  >
                    {isOfflineMode ? <WifiOff className="h-4 w-4 mr-1" /> : <Wifi className="h-4 w-4 mr-1" />}
                    {isOfflineMode ? t.offlineMode : t.onlineMode}
                  </button>
                </div>
              </div>

              {/* Player Controls */}
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>2:15</span>
                    <span>{currentAudio.duration}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-monastery-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-6">
                  <button 
                    onClick={() => setCurrentTrack(Math.max(0, currentTrack - 1))}
                    className="p-3 hover:bg-gray-100 rounded-full transition-colors"
                    disabled={currentTrack === 0}
                  >
                    <SkipBack className="h-6 w-6 text-gray-600" />
                  </button>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-monastery-primary hover:bg-monastery-secondary text-white p-4 rounded-full shadow-lg transform hover:scale-105 transition-all"
                  >
                    {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
                  </button>

                  <button 
                    onClick={() => setCurrentTrack(Math.min(audioTracks.length - 1, currentTrack + 1))}
                    className="p-3 hover:bg-gray-100 rounded-full transition-colors"
                    disabled={currentTrack === audioTracks.length - 1}
                  >
                    <SkipForward className="h-6 w-6 text-gray-600" />
                  </button>
                </div>

                <div className="flex items-center justify-center mt-6 space-x-4">
                  <Volume2 className="h-5 w-5 text-gray-600" />
                  <div className="flex-1 max-w-32">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={(e) => setVolume(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8">{volume}</span>
                </div>
              </div>
            </div>

            {/* Track Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{currentAudio.title}</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2 text-monastery-primary" />
                    <span>{t.location}: {currentAudio.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-2 text-monastery-primary" />
                    <span>{t.duration}: {currentAudio.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Headphones className="h-5 w-5 mr-2 text-monastery-primary" />
                    <span>{t.narrator}: {currentAudio.narrator}</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">{t.description}</h4>
                  <p className="text-gray-600 text-sm">{currentAudio.description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Playlist Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.playlistTitle}</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {audioTracks.map((track, index) => (
                  <div
                    key={track.id}
                    onClick={() => setCurrentTrack(index)}
                    className={`cursor-pointer p-3 rounded-lg transition-colors ${
                      currentTrack === index
                        ? 'bg-monastery-primary text-white'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <img
                        src={track.image}
                        alt={track.title}
                        className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-medium text-sm line-clamp-2 ${
                          currentTrack === index ? 'text-white' : 'text-gray-900'
                        }`}>
                          {track.title}
                        </h4>
                        <div className="flex items-center justify-between mt-1">
                          <p className={`text-xs ${
                            currentTrack === index ? 'text-monastery-gold' : 'text-gray-600'
                          }`}>
                            {track.duration}
                          </p>
                          <div className="flex items-center space-x-1">
                            {track.isDownloaded && (
                              <div className={`w-2 h-2 rounded-full ${
                                currentTrack === index ? 'bg-white' : 'bg-green-500'
                              }`} title="Downloaded for offline"></div>
                            )}
                            {!track.isDownloaded && (
                              <button
                                className={`p-1 rounded ${
                                  currentTrack === index 
                                    ? 'hover:bg-white hover:bg-opacity-20' 
                                    : 'hover:bg-gray-200'
                                }`}
                                title={t.downloadForOffline}
                              >
                                <Download className="h-3 w-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Download All Button */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <button className="w-full bg-monastery-gold hover:bg-amber-500 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center">
                  <Download className="h-4 w-4 mr-2" />
                  {t.downloadForOffline}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-monastery-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-monastery-primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">GPS Integration</h3>
            <p className="text-gray-600">Automatically plays relevant audio based on your location within the monastery</p>
          </div>
          <div className="text-center">
            <div className="bg-monastery-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <WifiOff className="h-8 w-8 text-monastery-primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Offline Mode</h3>
            <p className="text-gray-600">Download content for areas with limited connectivity and enjoy uninterrupted tours</p>
          </div>
          <div className="text-center">
            <div className="bg-monastery-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Headphones className="h-8 w-8 text-monastery-primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Narration</h3>
            <p className="text-gray-600">Listen to stories and insights from monks, historians, and cultural experts</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioGuide;