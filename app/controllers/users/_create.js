const { User } = require('../../models');
const { createJWT } = require('../../utils');

// * ─── CREATE NEW USER ────────────────────────────────────────────────────────────
exports.create = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    // * check for missing fields
    if (!email || !name || !password) return res.send({ success: false, status: 400, message: 'missing fields' });

    let user = new User({ name, email, password });

    user = await user.save();
    ({ _id, email } = user);
    // * generate token
    let token = createJWT({ _id, email });

    return res.send({ success: true, status: 200, data: { email, name, _id, token } });
  } catch (err) {
    return res.send({ success: false, status: 500 });
  }
};
