const { List, Board } = require('../../models');
const { oneBoardData } = require('../../utils');

/* -------------------------------------------------------------------------- */
/* ------------------------------ delete list ------------------------------- */
/* -------------------------------------------------------------------------- */
exports.delete = async (req, res) => {
  try {
    let { boardId, listId } = req.params;
    // let list = await List.findById(listId);

    // TODO delete all cards in list
    // TODO await Card.deleteMany({_id:{$in:list.cards}})

    await List.deleteOne({ _id: listId });

    // let board = await Board.findById(boardId);
    // TODO update lists orderInBoard
    // TODO delete list _id from board lists
    // TODO delete board.save()

    return res.send({ success: true, status: 200, data: await oneBoardData(boardId) });
  } catch (err) {
    return res.send({ success: false, status: 500 });
  }
};
