const mongoose = require('mongoose');

// * ─── BOARS SCHEMA AND MODEL ──────────────────────────────────────────────────────
const BoardSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    background: {
      type: String,
      enum: ['#1979BE', '#D29034', '#519839', '#B04632', '#89609E', '#CD5A91', '#5AC06B', '#42AECC', '#838C91'],
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    starred: { type: Boolean, default: false },
    lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }],
  },
  {
    timestamps: true,
  }
);

exports.Board = mongoose.model('Board', BoardSchema);
