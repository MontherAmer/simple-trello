const { Board } = require('../models');

// * ─── CHECK IF THE REQUEST IS COMING FROM BOARD ADMIN ────────────────────────────
// * should userd after isAuth middleware
exports.isBoardAdmin = async (req, res, next) => {
  try {
    let { boardId } = req.params;

    let board = await Board.findById(boardId);

    return String(board.createdBy) === String(req._id) ? next() : res.send({ success: false, status: 403 });
  } catch (err) {
    return res.send({ success: false, status: 500 });
  }
};
