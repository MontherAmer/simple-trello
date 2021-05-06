const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, index: { unique: true } },
    name: { type: String, required: true, minlength: 3 },
    password: { type: String },
    boards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Board' }],
  },
  {
    timestamps: true,
  }
);

// * pre save middleware to hash password before store it
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    let salt = bcrypt.genSaltSync(5);
    let hashedPassword = bcrypt.hashSync(this.password, salt);
    this.password = hashedPassword;
  }
  next();
});

// * create compare password for user model
UserSchema.methods.comparePassword = async function (password) {
  let isEqual = await bcrypt.compareSync(password, this.password);
  return isEqual;
};

exports.User = mongoose.model('User', UserSchema);
