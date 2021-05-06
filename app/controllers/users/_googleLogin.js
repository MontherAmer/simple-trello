const { User } = require('../../models');
const { createJWT } = require('../../utils');

exports.googleLogIn = async (req, res) => {
  try {
    // // * get data from google
    let name = req.user.name;
    let email = req.user._json.email;

    // * check if user signed up before
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
      let token = createJWT({ _id: user._id, email: user.email });
      return res.redirect(`/redirect/${token}/${user._id}`);
    }
  } catch (err) {
    return errorHandler(err, res);
    return res.send({ success: false, status: 500 });
  }
};
