const { User } = require('../../models');
const { createJWT, allBoardsData } = require('../../utils');

exports.getUserData = async (req, res) => {
  try {
    let { id } = req.params;
    // * find user with req.email
    let user = await User.findById(id);
    if (!user) return res.send({ success: false, status: 400, message: 'user not found' });

    // * create token
    let token = createJWT({ _id: id, email: user.email });
    let boards = await allBoardsData(id);
    let { _id, email, name } = user;
    return res.send({ success: true, status: 200, data: { _id, email, name, token, boards } });
  } catch (err) {
    return res.send({ success: false, status: 500 });
  }
};
