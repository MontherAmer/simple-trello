const { User } = require('../../models');
const { createJWT, allBoardsData } = require('../../utils');

// * ─── LOGIN CONTROLLER ───────────────────────────────────────────────────────────
exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;

    // * find user with req.email
    let user = await User.findOne({ email });
    if (!user) return res.send({ success: false, status: 401, message: 'email or password is wrong' });

    // * check password match
    let isMatched = await user.comparePassword(password);
    if (!isMatched) return res.send({ success: false, status: 401, message: 'email or password is wrong' });

    // * create token
    ({ _id, email, name } = user);
    let token = createJWT({ _id, email });

    let boards = await allBoardsData(_id);

    return res.send({ success: true, status: 200, data: { _id, email, name, token, boards } });
  } catch (err) {
    return res.send({ success: false, status: 500 });
  }
};
