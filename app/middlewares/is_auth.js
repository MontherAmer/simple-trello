const { User } = require('../models');
const { getTokenFromHeader } = require('../utils');

exports.isAuth = async (req, res, next) => {
  try {
    let { success, _id, email, e } = await getTokenFromHeader(req);
    if (!success) return errorsHandler({ e }, res);
    let user = await User.findById(_id);
    if (!user) return res.send({ success: false, status: 401 });
    req._id = _id;
    req.email = email;
    return next();
  } catch (err) {
    return res.send({ success: false, status: 500 });
  }
};
// 