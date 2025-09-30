const mongoose = require('mongoose');

const communityPostSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['story', 'photo', 'audio', 'discussion'],
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  monastery: {
    type: String,
    required: true
  },
  image: {
    type: String // URL for image
  },
  audioLength: {
    type: String // For audio posts
  },
  anonymous: {
    type: Boolean,
    default: false
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    content: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  shares: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CommunityPost', communityPostSchema);
