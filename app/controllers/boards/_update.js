const { Board } = require('../../models');
const { User } = require('../../models/_user.model');
const { oneBoardData, allBoardsData } = require('../../utils');

// * ─── UPDATE BOARD ───────────────────────────────────────────────────────────────
exports.update = async (req, res) => {
  try {
    let { title, description, member, background, starred } = req.body;
    let board = await Board.findById(req.params.boardId);

    // * update the recived value
    board.title = title ? title : board.title;
    board.description = description ? description : board.description;
    board.background = background ? background : board.background;
    board.starred = starred ? (board.starred = !board.starred) : board.starred;

    if (member) {
      let user = await User.findOne({ email: member });
      if (!board.members.includes(user._id)) {
        board.members = board.members.concat(user._id);
      }
    }

    await board.save();

    let data = await oneBoardData(req.params.boardId);

    return res.send({ success: true, status: 200, data, allBoardsData: await allBoardsData(req._id) });
  } catch (err) {
    console.error(err);
    return res.send({ success: false, status: 500 });
  }
};
