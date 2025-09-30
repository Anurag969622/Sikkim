import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Camera, Archive, Calendar, Users, Headphones, ChevronRight, Play, Star } from 'lucide-react';

interface HomepageProps {
  language: string;
  onBooking: () => void;
}

const Homepage: React.FC<HomepageProps> = ({ language, onBooking }) => {
  const navigate = useNavigate();
  const translations = {
    english: {
      heroTitle: "Discover Sikkim's Sacred Monasteries",
      heroSubtitle: "Experience the spiritual heritage through immersive digital tours",
      heroDescription: "Journey through centuries of Buddhist culture with our 360° virtual tours, interactive maps, and rich digital archives.",
      exploreNow: "Explore Now",
      watchIntro: "Watch Introduction",
      featuresTitle: "Explore Our Features",
      virtualTours: "Virtual Tours",
      virtualToursDesc: "Immersive 360° tours with VR support",
      interactiveMap: "Interactive Map",
      interactiveMapDesc: "Discover locations with travel routes",
      digitalArchives: "Digital Archives",
      digitalArchivesDesc: "High-resolution manuscripts and documents",
      audioGuide: "Audio Guide",
      audioGuideDesc: "GPS-based narrated experiences",
      calendar: "Cultural Calendar",
      calendarDesc: "Festival dates and booking options",
      community: "Community",
      communityDesc: "Share stories and experiences",
      monasterySpotlight: "Monastery Spotlight",
      learnMore: "Learn More",
      bookTour: "Book Tour"
    },
    nepali: {
      heroTitle: "सिक्किमका पवित्र गुम्बाहरू खोज्नुहोस्",
      heroSubtitle: "डिजिटल टुरको माध्यमबाट आध्यात्मिक सम्पदाको अनुभव लिनुहोस्",
      heroDescription: "हाम्रो ३६०° भर्चुअल टुर, अन्तरक्रियात्मक नक्सा र समृद्ध डिजिटल अभिलेखागारसँग शताब्दीयौं बौद्ध संस्कृतिको यात्रा गर्नुहोस्।",
      exploreNow: "अहिले अन्वेषण गर्नुहोस्",
      watchIntro: "परिचय हेर्नुहोस्",
      featuresTitle: "हाम्रा सुविधाहरू अन्वेषण गर्नुहोस्",
      virtualTours: "भर्चुअल टुर",
      virtualToursDesc: "VR समर्थनसहित ३६०° टुर",
      interactiveMap: "अन्तरक्रियात्मक नक्सा",
      interactiveMapDesc: "यात्रा मार्गसहित स्थानहरू खोज्नुहोस्",
      digitalArchives: "डिजिटल अभिलेखागार",
      digitalArchivesDesc: "उच्च रिजोलुसन पाण्डुलिपि र कागजातहरू",
      audioGuide: "अडियो गाइड",
      audioGuideDesc: "GPS आधारित वर्णनात्मक अनुभवहरू",
      calendar: "सांस्कृतिक पंचांग",
      calendarDesc: "चाड पर्वका मितिहरू र बुकिङ विकल्पहरू",
      community: "समुदाय",
      communityDesc: "कथाहरू र अनुभवहरू साझा गर्नुहोस्",
      monasterySpotlight: "गुम्बा स्पटलाइट",
      learnMore: "थप जान्नुहोस्",
      bookTour: "टुर बुक गर्नुहोस्"
    }
  };

  const t = translations[language as keyof typeof translations] || translations.english;

  const features = [
    {
      icon: Camera,
      title: t.virtualTours,
      description: t.virtualToursDesc,
      page: 'virtual-tours',
      gradient: 'from-monastery-primary to-monastery-secondary'
    },
    {
      icon: MapPin,
      title: t.interactiveMap,
      description: t.interactiveMapDesc,
      page: 'map',
      gradient: 'from-monastery-gold to-amber-500'
    },
    {
      icon: Archive,
      title: t.digitalArchives,
      description: t.digitalArchivesDesc,
      page: 'archives',
      gradient: 'from-indigo-600 to-blue-600'
    },
    {
      icon: Headphones,
      title: t.audioGuide,
      description: t.audioGuideDesc,
      page: 'audio-guide',
      gradient: 'from-green-600 to-emerald-600'
    },
    {
      icon: Calendar,
      title: t.calendar,
      description: t.calendarDesc,
      page: 'calendar',
      gradient: 'from-purple-600 to-violet-600'
    },
    {
      icon: Users,
      title: t.community,
      description: t.communityDesc,
      page: 'community',
      gradient: 'from-rose-600 to-pink-600'
    }
  ];

  const featuredMonasteries = [
    {
      name: "Rumtek Monastery",
      location: "East Sikkim",
      image: "https://images.pexels.com/photos/3649329/pexels-photo-3649329.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "The largest monastery in Sikkim, seat of the Karmapa",
      rating: 4.9,
      type: "Kagyu Tradition"
    },
    {
      name: "Pemayangtse Monastery",
      location: "West Sikkim",
      image: "https://images.pexels.com/photos/4963435/pexels-photo-4963435.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "One of the oldest monasteries in Sikkim",
      rating: 4.8,
      type: "Nyingma Tradition"
    },
    {
      name: "Tashiding Monastery",
      location: "West Sikkim",
      image: "https://images.pexels.com/photos/17810975/pexels-photo-17810975.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Sacred site on a hilltop with panoramic views",
      rating: 4.7,
      type: "Nyingma Tradition"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/12879678/pexels-photo-12879678.jpeg?auto=compress&cs=tinysrgb&w=1920)'
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            {t.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl mb-4 opacity-90">
            {t.heroSubtitle}
          </p>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-80">
            {t.heroDescription}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate('/virtual-tours')}
              className="bg-monastery-primary hover:bg-monastery-secondary text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center"
            >
              {t.exploreNow}
              <ChevronRight className="ml-2 h-5 w-5" />
            </button>
            <button className="border-2 border-white hover:bg-white hover:text-black text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 flex items-center">
              <Play className="mr-2 h-5 w-5" />
              {t.watchIntro}
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.featuresTitle}</h2>
            <div className="w-24 h-1 bg-monastery-gold mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                onClick={() => navigate(`/${feature.page}`)}
                className="group cursor-pointer bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-monastery-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="flex items-center text-monastery-primary font-medium">
                  {t.learnMore}
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Monasteries */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.monasterySpotlight}</h2>
            <div className="w-24 h-1 bg-monastery-gold mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredMonasteries.map((monastery, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  <img
                    src={monastery.image}
                    alt={monastery.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                    <Star className="h-4 w-4 text-monastery-gold mr-1" />
                    <span className="text-sm font-semibold">{monastery.rating}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-monastery-primary bg-opacity-90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                    {monastery.type}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {monastery.location}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{monastery.name}</h3>
                  <p className="text-gray-600 mb-4">{monastery.description}</p>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={() => navigate('/virtual-tours')}
                      className="flex-1 bg-monastery-primary hover:bg-monastery-secondary text-white py-2 px-4 rounded-lg transition-colors font-medium"
                    >
                      {t.learnMore}
                    </button>
                    <button
                      onClick={onBooking}
                      className="flex-1 border border-monastery-primary text-monastery-primary hover:bg-monastery-primary hover:text-white py-2 px-4 rounded-lg transition-colors font-medium"
                    >
                      {t.bookTour}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-monastery-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">108+</div>
              <div className="text-monastery-gold">Monasteries</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25K+</div>
              <div className="text-monastery-gold">Visitors</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-monastery-gold">Artifacts</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-monastery-gold">Languages</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;