const { List, Board } = require('../../models');
const { oneBoardData } = require('../../utils');
/* -------------------------------------------------------------------------- */
/* ---------------------------- create new list ----------------------------- */
/* -------------------------------------------------------------------------- */
exports.create = async (req, res) => {
  try {
    let affectedBoard = await Board.findById(req.params.boardId);

    // * create new list
    let list = new List({ ...req.body, orderInBoard: affectedBoard.lists.length || 0 });

    list = await list.save();

    // * save the list in board
    affectedBoard.lists = affectedBoard.lists.concat(list._id);

    await affectedBoard.save();

    return res.send({ success: true, status: 200, data: await oneBoardData(req.params.boardId) });
  } catch (err) {
    return res.send({ success: false, status: 500 });
  }
};
