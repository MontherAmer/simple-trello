const mongoose = require('mongoose');

// * ─── LISTS SCHEMA AND MODEL ──────────────────────────────────────────────────────
const ListSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    orderInBoard: { type: Number },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
  },
  {
    timestamps: true,
  }
);

exports.List = mongoose.model('List', ListSchema);
