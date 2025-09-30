const express = require('express');
const jwt = require('jsonwebtoken');
const CommunityPost = require('../models/CommunityPost');
const router = express.Router();

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

// Get all community posts
router.get('/', async (req, res) => {
  try {
    const { type, monastery } = req.query;
    let query = {};
    if (type) query.type = type;
    if (monastery) query.monastery = monastery;

    const posts = await CommunityPost.find(query)
      .populate('author', 'username')
      .populate('likes', 'username')
      .populate('comments.author', 'username')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single post
router.get('/:id', async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id)
      .populate('author', 'username')
      .populate('likes', 'username')
      .populate('comments.author', 'username');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create community post (protected)
router.post('/', auth, async (req, res) => {
  try {
    const { type, title, content, monastery, image, audioLength, anonymous } = req.body;
    const post = new CommunityPost({
      type,
      title,
      content,
      author: req.userId,
      monastery,
      image,
      audioLength,
      anonymous
    });
    await post.save();
    await post.populate('author', 'username');
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Like post (protected)
router.post('/:id/like', auth, async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const userId = req.userId;
    if (post.likes.includes(userId)) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }
    await post.save();
    await post.populate('likes', 'username');
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add comment (protected)
router.post('/:id/comment', auth, async (req, res) => {
  try {
    const { content } = req.body;
    const post = await CommunityPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    post.comments.push({
      author: req.userId,
      content
    });
    await post.save();
    await post.populate('comments.author', 'username');
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update post (protected, only author)
router.put('/:id', auth, async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.author.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    post.monastery = req.body.monastery || post.monastery;
    post.image = req.body.image || post.image;
    post.audioLength = req.body.audioLength || post.audioLength;
    await post.save();
    await post.populate('author', 'username');
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete post (protected, only author)
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.author.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await CommunityPost.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
