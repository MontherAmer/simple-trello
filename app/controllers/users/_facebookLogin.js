const { User } = require('../../models');
const { createJWT } = require('../../utils');

exports.faceBookLogIn = async (req, res) => {
  try {
    // * get user data from facebook
    let name = req.user._json.first_name + req.user._json.last_name;
    let email = req.user._json.email;
    let user = await User.findOne({ email });

    if (user) {
      // * user have account in DB
      let _id = user._id;
      let token = createJWT({ _id, email });
      return res.redirect(`/redirect/${token}/${user._id}`);
    } else {
      // * user does not have account in DB
      user = new User({ name, email });
      user = await user.save();
      // * create token
      let token = createJWT({ _id: user._id, email: user.email });
      return res.redirect(`/redirect/${token}/${user._id}`);
    }
  } catch (err) {
    return res.send({ success: false, status: 500 });
  }
};
