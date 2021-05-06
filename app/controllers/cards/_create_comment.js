const { Card, Comment } = require('../../models');
const { oneBoardData } = require('../../utils');

/* -------------------------------------------------------------------------- */
/* -------------------------- create new comment ---------------------------- */
/* -------------------------------------------------------------------------- */
exports.createComment = async (req, res) => {
  try {
    let { text } = req.body;

    let { boardId, cardId } = req.params;

    let comment = new Comment({ text, user: req._id });

    comment = await comment.save();

    let card = await Card.findById(cardId);

    card.comments = card.comments.concat(comment._id);
    await card.save();

    return res.send({ success: true, status: 200, data: await oneBoardData(boardId) });
  } catch (err) {
    return res.send({ success: false, status: 500 });
  }
};
