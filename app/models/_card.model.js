const mongoose = require('mongoose');

// * ─── CARDS SCHEMA AND MODEL ──────────────────────────────────────────────────────
const CardSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    label: { type: String },
    checkList: [],
    archived: { type: Boolean, default: false },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    attachments: [{ type: String }],
    board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board' },
  },
  {
    timestamps: true,
  }
);

exports.Card = mongoose.model('Card', CardSchema);
