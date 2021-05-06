const { Card, List } = require('../../models');
const { oneBoardData } = require('../../utils');

/* -------------------------------------------------------------------------- */
/* ---------------------------- create new card ----------------------------- */
/* -------------------------------------------------------------------------- */
exports.create = async (req, res) => {
  try {
    let { title, listId } = req.body;
    let card = new Card({ title, members: [req._id] });
    card = await card.save();

    await List.updateOne({ _id: listId }, { $push: { cards: card._id } });

    return res.send({ success: true, status: 200, data: await oneBoardData(req.params.boardId) });
  } catch (err) {
    return res.send({ success: false, status: 500 });
  }
};
