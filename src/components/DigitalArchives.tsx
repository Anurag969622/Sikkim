import React, { useState } from 'react';
import { Search, Filter, Download, Eye, BookOpen, Image, FileText, Star, Calendar } from 'lucide-react';

interface DigitalArchivesProps {
  language: string;
}

const DigitalArchives: React.FC<DigitalArchivesProps> = ({ language }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const translations = {
    english: {
      title: "Digital Archives",
      subtitle: "Explore high-resolution manuscripts, murals, and rare documents",
      searchPlaceholder: "Search archives...",
      categories: "Categories",
      all: "All Items",
      manuscripts: "Manuscripts",
      murals: "Murals",
      artifacts: "Artifacts",
      photographs: "Photographs",
      documents: "Documents",
      viewPreview: "View Preview",
      download: "Download",
      gridView: "Grid View",
      listView: "List View",
      highResolution: "High Resolution",
      copyrightProtected: "Copyright Protected",
      dateAdded: "Date Added",
      monastery: "Monastery",
      period: "Period",
      language: "Language",
      closePreview: "Close Preview"
    },
    nepali: {
      title: "डिजिटल अभिलेखागार",
      subtitle: "उच्च रिजोलुसन पाण्डुलिपि, भित्ति चित्र र दुर्लभ कागजातहरू अन्वेषण गर्नुहोस्",
      searchPlaceholder: "अभिलेखागार खोज्नुहोस्...",
      categories: "श्रेणीहरू",
      all: "सबै वस्तुहरू",
      manuscripts: "पाण्डुलिपिहरू",
      murals: "भित्ति चित्रहरू",
      artifacts: "कलाकृतिहरू",
      photographs: "तस्बिरहरू",
      documents: "कागजातहरू",
      viewPreview: "पूर्वावलोकन हेर्नुहोस्",
      download: "डाउनलोड गर्नुहोस्",
      gridView: "ग्रिड दृश्य",
      listView: "सूची दृश्य",
      highResolution: "उच्च रिजोलुसन",
      copyrightProtected: "कप्राइट संरक्षित",
      dateAdded: "थपिएको मिति",
      monastery: "गुम्बा",
      period: "अवधि",
      language: "भाषा",
      closePreview: "पूर्वावलोकन बन्द गर्नुहोस्"
    }
  };

  const t = translations[language as keyof typeof translations] || translations.english;

  const archiveItems = [
    {
      id: 1,
      title: "Lotus Sutra Manuscript",
      type: "manuscripts",
      monastery: "Rumtek Monastery",
      period: "16th Century",
      language: "Tibetan",
      description: "Ancient manuscript of the Lotus Sutra with gold leaf illustrations",
      image: "https://images.pexels.com/photos/3649329/pexels-photo-3649329.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.9,
      downloads: 1250,
      dateAdded: "2024-01-15",
      resolution: "4K",
      fileSize: "25 MB"
    },
    {
      id: 2,
      title: "Buddha Mural",
      type: "murals",
      monastery: "Pemayangtse Monastery",
      period: "17th Century",
      language: "Visual",
      description: "Intricate wall painting depicting Buddha's life stories",
      image: "https://images.pexels.com/photos/4963435/pexels-photo-4963435.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8,
      downloads: 890,
      dateAdded: "2024-01-10",
      resolution: "8K",
      fileSize: "45 MB"
    },
    {
      id: 3,
      title: "Prayer Wheel",
      type: "artifacts",
      monastery: "Tashiding Monastery",
      period: "18th Century",
      language: "Sanskrit",
      description: "Traditional prayer wheel with carved mantras",
      image: "https://images.pexels.com/photos/17810975/pexels-photo-17810975.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.7,
      downloads: 650,
      dateAdded: "2024-01-08",
      resolution: "4K",
      fileSize: "18 MB"
    },
    {
      id: 4,
      title: "Monastery Foundation Records",
      type: "documents",
      monastery: "Enchey Monastery",
      period: "19th Century",
      language: "Tibetan",
      description: "Historical documents about monastery establishment",
      image: "https://images.pexels.com/photos/12879678/pexels-photo-12879678.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.6,
      downloads: 420,
      dateAdded: "2024-01-05",
      resolution: "HD",
      fileSize: "12 MB"
    },
    {
      id: 5,
      title: "Ritual Dance Photographs",
      type: "photographs",
      monastery: "Ralang Monastery",
      period: "20th Century",
      language: "Visual",
      description: "Black and white photographs of traditional Cham dance",
      image: "https://images.pexels.com/photos/3649329/pexels-photo-3649329.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.5,
      downloads: 780,
      dateAdded: "2024-01-03",
      resolution: "4K",
      fileSize: "30 MB"
    },
    {
      id: 6,
      title: "Mandala Painting",
      type: "murals",
      monastery: "Rumtek Monastery",
      period: "15th Century",
      language: "Visual",
      description: "Sacred geometric mandala with intricate details",
      image: "https://images.pexels.com/photos/4963435/pexels-photo-4963435.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.9,
      downloads: 1100,
      dateAdded: "2024-01-01",
      resolution: "8K",
      fileSize: "52 MB"
    }
  ];

  const categories = [
    { id: 'all', label: t.all, icon: BookOpen, count: archiveItems.length },
    { id: 'manuscripts', label: t.manuscripts, icon: FileText, count: archiveItems.filter(item => item.type === 'manuscripts').length },
    { id: 'murals', label: t.murals, icon: Image, count: archiveItems.filter(item => item.type === 'murals').length },
    { id: 'artifacts', label: t.artifacts, icon: Star, count: archiveItems.filter(item => item.type === 'artifacts').length },
    { id: 'photographs', label: t.photographs, icon: Eye, count: archiveItems.filter(item => item.type === 'photographs').length },
    { id: 'documents', label: t.documents, icon: FileText, count: archiveItems.filter(item => item.type === 'documents').length }
  ];

  const filteredItems = archiveItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.type === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.monastery.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
            {/* Search */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-monastery-primary focus:border-transparent"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                {t.categories}
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center justify-between ${
                      selectedCategory === category.id
                        ? 'bg-monastery-primary text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <category.icon className="h-4 w-4 mr-3" />
                      {category.label}
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      selectedCategory === category.id
                        ? 'bg-white bg-opacity-20 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Controls */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">
                  {filteredItems.length} items found
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-monastery-primary text-white' : 'bg-gray-200 text-gray-600'}`}
                >
                  <div className="w-4 h-4 border-2 border-current"></div>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-monastery-primary text-white' : 'bg-gray-200 text-gray-600'}`}
                >
                  <div className="space-y-1">
                    <div className="w-4 h-1 bg-current"></div>
                    <div className="w-4 h-1 bg-current"></div>
                    <div className="w-4 h-1 bg-current"></div>
                  </div>
                </button>
              </div>
            </div>

            {/* Archive Items Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2 bg-monastery-primary text-white px-2 py-1 rounded text-xs">
                        {item.resolution}
                      </div>
                      <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                        {item.fileSize}
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center text-gray-500 text-xs mb-2">
                        <Calendar className="h-3 w-3 mr-1" />
                        {item.period}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-monastery-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <span>{item.monastery}</span>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-monastery-gold mr-1" />
                          {item.rating}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedItem(item.id)}
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm transition-colors flex items-center justify-center"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          {t.viewPreview}
                        </button>
                        <button className="flex-1 bg-monastery-primary hover:bg-monastery-secondary text-white py-2 px-3 rounded-lg text-sm transition-colors flex items-center justify-center">
                          <Download className="h-4 w-4 mr-1" />
                          {t.download}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex space-x-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 hover:text-monastery-primary transition-colors">
                            {item.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="bg-monastery-primary text-white px-2 py-1 rounded text-xs">
                              {item.resolution}
                            </span>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-monastery-gold mr-1" />
                              {item.rating}
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{item.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500 mb-4">
                          <div><span className="font-medium">{t.monastery}:</span> {item.monastery}</div>
                          <div><span className="font-medium">{t.period}:</span> {item.period}</div>
                          <div><span className="font-medium">{t.language}:</span> {item.language}</div>
                          <div><span className="font-medium">Downloads:</span> {item.downloads}</div>
                        </div>

                        <div className="flex space-x-3">
                          <button
                            onClick={() => setSelectedItem(item.id)}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm transition-colors flex items-center"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            {t.viewPreview}
                          </button>
                          <button className="bg-monastery-primary hover:bg-monastery-secondary text-white py-2 px-4 rounded-lg text-sm transition-colors flex items-center">
                            <Download className="h-4 w-4 mr-2" />
                            {t.download}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No results */}
            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No items found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>

        {/* Preview Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-hidden">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-900">
                  {archiveItems.find(item => item.id === selectedItem)?.title}
                </h2>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="p-6">
                <img
                  src={archiveItems.find(item => item.id === selectedItem)?.image}
                  alt="Preview"
                  className="w-full max-h-96 object-contain mb-4 rounded-lg"
                />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="font-medium">Monastery:</span> {archiveItems.find(item => item.id === selectedItem)?.monastery}</div>
                  <div><span className="font-medium">Period:</span> {archiveItems.find(item => item.id === selectedItem)?.period}</div>
                  <div><span className="font-medium">Language:</span> {archiveItems.find(item => item.id === selectedItem)?.language}</div>
                  <div><span className="font-medium">Resolution:</span> {archiveItems.find(item => item.id === selectedItem)?.resolution}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DigitalArchives;