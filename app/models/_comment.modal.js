const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
  {
    text: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

exports.Comment = mongoose.model('Comment', CommentSchema);
