const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const Blog = require('../models/Blog');
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

// Middleware to verify JWT
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Get all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'username').sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single blog
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'username');
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create blog (protected)
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, content } = req.body;
    let imageUrl = '';
    let publicId = '';
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.buffer, {
        folder: 'osint-blogs',
        transformation: [{ width: 800, height: 600, crop: 'fill' }]
      });
      imageUrl = result.secure_url;
      publicId = result.public_id;
    }
    const blog = new Blog({
      title,
      content,
      image: imageUrl,
      publicId,
      author: req.userId
    });
    await blog.save();
    await blog.populate('author', 'username');
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update blog (protected, only author)
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    if (blog.author.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Delete old image if new one is uploaded
    if (req.file && blog.publicId) {
      await cloudinary.uploader.destroy(blog.publicId);
    }

    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.buffer, {
        folder: 'osint-blogs',
        transformation: [{ width: 800, height: 600, crop: 'fill' }]
      });
      blog.image = result.secure_url;
      blog.publicId = result.public_id;
    }
    await blog.save();
    await blog.populate('author', 'username');
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete blog (protected, only author)
router.delete('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    if (blog.author.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Delete image from Cloudinary if exists
    if (blog.publicId) {
      await cloudinary.uploader.destroy(blog.publicId);
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
