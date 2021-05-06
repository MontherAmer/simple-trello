const { Card, List } = require('../../models');
const { oneBoardData } = require('../../utils');

/* -------------------------------------------------------------------------- */
/* ---------------------------- delete card --------------------------------- */
/* -------------------------------------------------------------------------- */
exports.delete = async (req, res) => {
  try {
    let { cardId, listId, boardId } = req.params;
    await Card.deleteOne({ _id: cardId });

    let list = await List.findById(listId);
    let cards = list.cards.filter((card) => card._id !== cardId);
    list.cards = cards;
    await list.save();

    return res.send({ success: true, status: 200, data: await oneBoardData(boardId) });
  } catch (err) {
    return res.send({ success: false, status: 500 });
  }
};
