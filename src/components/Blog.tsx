import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  image?: string;
  author: { username: string };
  createdAt: string;
  updatedAt: string;
}

const Blog: React.FC = () => {
  const { user, token } = useAuth();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [editingImage, setEditingImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (editingImage) {
      setImagePreview(editingImage);
    }
  }, [editingImage]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/blogs');
      setBlogs(response.data);
    } catch (err) {
      console.error('Error fetching blogs:', err);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content', formData.content);
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      const config = { 
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        } 
      };

      if (editing) {
        await axios.put(`http://localhost:5000/api/blogs/${editing}`, formDataToSend, config);
      } else {
        await axios.post('http://localhost:5000/api/blogs', formDataToSend, config);
      }
      setFormData({ title: '', content: '' });
      setImageFile(null);
      setImagePreview(null);
      setShowForm(false);
      setEditing(null);
      setEditingImage(null);
      fetchBlogs();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error saving blog');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog: BlogPost) => {
    setFormData({ title: blog.title, content: blog.content });
    setEditing(blog._id);
    setEditingImage(blog.image || null);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBlogs();
    } catch (err) {
      console.error('Error deleting blog:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Blog</h1>
        {user && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            {showForm ? 'Cancel' : 'New Post'}
          </button>
        )}
      </div>

      {showForm && user && (
        <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <textarea
              placeholder="Content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Image (Optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {imagePreview && (
              <div className="mt-2">
                <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-md" />
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : editing ? 'Update' : 'Create'} Post
          </button>
        </form>
      )}

      <div className="space-y-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white p-6 rounded-lg shadow-md">
            {blog.image && (
              <img 
                src={blog.image} 
                alt={blog.title} 
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            )}
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{blog.title}</h2>
            <p className="text-gray-600 mb-4">{blog.content}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>By {blog.author.username}</span>
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
            {user && user.username === blog.author.username && (
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleEdit(blog)}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
