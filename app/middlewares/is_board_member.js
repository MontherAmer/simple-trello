const { Board } = require('../models');

// * ─── CHECK IF THE REQUEST IS COMING FROM BOARD MEMBER ────────────────────────────
// * should userd after isAuth middleware

exports.isBoardMember = async (req, res, next) => {
  try {
    let { boardId } = req.params;

    let board = await Board.findById(boardId);

    return board.members.includes(req._id) ? next() : res.send({ success: false, status: 403 });
  } catch (err) {
    return res.send({ success: false, status: 500 });
  }
};
