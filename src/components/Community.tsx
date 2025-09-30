import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MessageCircle, Heart, Share2, Image, Mic, Users, Star, Calendar, MapPin } from 'lucide-react';

interface Post {
  _id: string;
  type: string;
  title: string;
  content: string;
  author: { _id: string; username: string };
  monastery: string;
  image?: string;
  audioLength?: string;
  anonymous: boolean;
  likes: number;
  comments: number;
  shares: number;
  createdAt: string;
}

const Community: React.FC = () => {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState('stories');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const translations = {
    english: {
      title: "Community & Participation",
      subtitle: "Share stories, connect with fellow travelers, and contribute to our cultural heritage",
      stories: "Stories",
      photos: "Photos",
      audio: "Audio",
      discussions: "Discussions",
      shareYourStory: "Share Your Story",
      sharePhoto: "Share Photo",
      recordAudio: "Record Audio",
      startDiscussion: "Start Discussion",
      like: "Like",
      comment: "Comment",
      share: "Share",
      upload: "Upload",
      cancel: "Cancel",
      writeStory: "Write your story...",
      addTitle: "Add a title...",
      selectMonastery: "Select monastery",
      anonymous: "Post anonymously",
      postStory: "Post Story",
      loginToInteract: "Login to interact"
    }
  };

  const t = translations.english;

  const loginToInteract = t.loginToInteract;

  useEffect(() => {
    fetchPosts();
  }, [activeTab]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`http://localhost:5000/api/community?type=${activeTab}`);
      setPosts(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId: string) => {
    if (!token) {
      alert(loginToInteract);
      return;
    }
    try {
      const response = await axios.post(`http://localhost:5000/api/community/${postId}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Update local state
      setPosts(posts.map(p => p._id === postId ? { ...p, likes: response.data.likes.length } : p));
    } catch (err) {
      console.error(err);
    }
  };

  const handlePostStory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      alert(loginToInteract);
      return;
    }
    const form = e.target as HTMLFormElement;
    const title = (form.elements.namedItem('title') as HTMLInputElement).value;
    const content = (form.elements.namedItem('content') as HTMLTextAreaElement).value;
    const monastery = (form.elements.namedItem('monastery') as HTMLSelectElement).value;
    const anonymous = (form.elements.namedItem('anonymous') as HTMLInputElement).checked;
    try {
      const response = await axios.post('http://localhost:5000/api/community', {
        type: 'story',
        title,
        content,
        monastery,
        anonymous
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts([response.data, ...posts]);
      setShowUploadModal(false);
      form.reset();
    } catch (err) {
      console.error(err);
      alert('Failed to post story');
    }
  };

  const monasteries = [
    'Rumtek Monastery',
    'Pemayangtse Monastery',
    'Tashiding Monastery',
    'Enchey Monastery',
    'Ralang Monastery'
  ];

  const tabs = [
    { id: 'stories', label: t.stories, icon: MessageCircle },
    { id: 'photos', label: t.photos, icon: Image },
    { id: 'audio', label: t.audio, icon: Mic },
    { id: 'discussions', label: t.discussions, icon: Users }
  ];

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

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
            {/* Contribution Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contribute</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setShowUploadModal(true)}
                  disabled={!token}
                  className={`w-full py-2 px-4 rounded-lg transition-colors flex items-center justify-center ${!token ? 'bg-gray-300 cursor-not-allowed' : 'bg-monastery-primary hover:bg-monastery-secondary text-white'}`}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {t.shareYourStory}
                </button>
                <button disabled={!token} className={`w-full py-2 px-4 rounded-lg transition-colors flex items-center justify-center ${!token ? 'bg-gray-300 cursor-not-allowed' : 'bg-monastery-gold hover:bg-amber-500 text-white'}`}>
                  <Image className="h-4 w-4 mr-2" />
                  {t.sharePhoto}
                </button>
                <button disabled={!token} className={`w-full py-2 px-4 rounded-lg transition-colors flex items-center justify-center ${!token ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'}`}>
                  <Mic className="h-4 w-4 mr-2" />
                  {t.recordAudio}
                </button>
                <button disabled={!token} className={`w-full py-2 px-4 rounded-lg transition-colors flex items-center justify-center ${!token ? 'bg-gray-300 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 text-white'}`}>
                  <Users className="h-4 w-4 mr-2" />
                  {t.startDiscussion}
                </button>
              </div>
            </div>

            {/* Community Stats - Static for now */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Stories Shared</span>
                  <span className="font-semibold text-monastery-primary">{posts.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Likes</span>
                  <span className="font-semibold text-monastery-primary">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Users</span>
                  <span className="font-semibold text-monastery-primary">456</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tab Navigation */}
            <div className="bg-white rounded-lg shadow-md mb-6">
              <div className="flex space-x-0 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 px-6 py-4 text-center font-medium transition-colors flex items-center justify-center ${
                      activeTab === tab.id
                        ? 'text-monastery-primary border-b-2 border-monastery-primary bg-monastery-primary bg-opacity-5'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="h-5 w-5 mr-2" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.length === 0 ? (
                <p className="text-center text-gray-500">No posts yet. Be the first to share!</p>
              ) : (
                posts.map((post) => (
                  <div key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    {/* Post Header */}
                    <div className="p-6 pb-0">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gray-300 rounded-full"></div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-gray-900">{post.anonymous ? 'Anonymous' : post.author.username}</h3>
                            <span className="text-gray-500">•</span>
                            <div className="flex items-center text-gray-500 text-sm">
                              <MapPin className="h-3 w-3 mr-1" />
                              {post.monastery}
                            </div>
                          </div>
                          <div className="flex items-center text-gray-500 text-sm">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(post.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="p-6 pt-4">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">{post.title}</h4>
                      <p className="text-gray-600 mb-4">{post.content}</p>

                      {/* Media Content */}
                      {post.image && (
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-64 object-cover rounded-lg mb-4"
                        />
                      )}

                      {post.type === 'audio' && post.audioLength && (
                        <div className="bg-gray-100 rounded-lg p-4 mb-4 flex items-center space-x-4">
                          <div className="bg-monastery-primary text-white p-3 rounded-full">
                            <Mic className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">Audio Recording</p>
                            <p className="text-sm text-gray-600">Duration: {post.audioLength}</p>
                          </div>
                          <button className="bg-monastery-primary hover:bg-monastery-secondary text-white px-4 py-2 rounded-lg transition-colors">
                            Play
                          </button>
                        </div>
                      )}

                      {/* Post Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-6">
                          <button 
                            onClick={() => handleLike(post._id)}
                            className="flex items-center space-x-2 text-gray-600 hover:text-monastery-primary transition-colors"
                          >
                            <Heart className="h-5 w-5" />
                            <span>{post.likes} {t.like}</span>
                          </button>
                          <button className="flex items-center space-x-2 text-gray-600 hover:text-monastery-primary transition-colors">
                            <MessageCircle className="h-5 w-5" />
                            <span>{post.comments} {t.comment}</span>
                          </button>
                          <button className="flex items-center space-x-2 text-gray-600 hover:text-monastery-primary transition-colors">
                            <Share2 className="h-5 w-5" />
                            <span>{post.shares} {t.share}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Load More - Static for now */}
            <div className="text-center mt-8">
              <button className="bg-monastery-primary hover:bg-monastery-secondary text-white px-6 py-3 rounded-lg transition-colors">
                Load More Posts
              </button>
            </div>
          </div>
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">{t.shareYourStory}</h2>
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>
              </div>
              
              <form onSubmit={handlePostStory} className="p-6 max-h-96 overflow-y-auto">
                <div className="space-y-4">
                  <input
                    name="title"
                    type="text"
                    placeholder={t.addTitle}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-monastery-primary focus:border-transparent"
                  />
                  
                  <select 
                    name="monastery"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-monastery-primary focus:border-transparent"
                  >
                    <option value="">{t.selectMonastery}</option>
                    {monasteries.map((monastery) => (
                      <option key={monastery} value={monastery}>{monastery}</option>
                    ))}
                  </select>
                  
                  <textarea
                    name="content"
                    placeholder={t.writeStory}
                    rows={8}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-monastery-primary focus:border-transparent resize-none"
                  ></textarea>
                  
                  <div className="flex items-center">
                    <input type="checkbox" name="anonymous" id="anonymous" className="mr-2" />
                    <label htmlFor="anonymous" className="text-sm text-gray-600">{t.anonymous}</label>
                  </div>
                </div>
                <button type="submit" className="mt-4 w-full bg-monastery-primary hover:bg-monastery-secondary text-white py-2 rounded-lg">
                  {t.postStory}
                </button>
              </form>

              <div className="p-6 border-t flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  {t.cancel}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;
