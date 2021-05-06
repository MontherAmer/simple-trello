const { Board, User } = require('../../models');
const { allBoardsData } = require('../../utils');

const backgrounds = ['#1979BE', '#D29034', '#519839', '#B04632', '#89609E', '#CD5A91', '#5AC06B', '#42AECC', '#838C91'];

// * ─── CREATE NEW BOARD ───────────────────────────────────────────────────────────
exports.create = async (req, res) => {
  try {
    // * get title and background from req.body if background not exist chiise random value
    let { title, background } = req.body;
    if (!title) return res.send({ success: false, status: 400 });
    background = background ? background : backgrounds[Math.floor(Math.random() * backgrounds.length)];

    let board = new Board({ title, background, createdBy: req._id, members: [req._id] });

    let data = await board.save();
    // * update user and add board id to user boards array
    await User.updateOne({ _id: req._id }, { $push: { boards: data._id } });

    return res.send({ success: true, status: 200, data: await allBoardsData(req._id) });
  } catch (err) {
    return res.send({ success: false, status: 500 });
  }
};
