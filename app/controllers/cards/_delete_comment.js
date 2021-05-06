const { Card, Comment } = require('../../models');
const { oneBoardData } = require('../../utils');

/* -------------------------------------------------------------------------- */
/* ---------------------------- delete comment ------------------------------ */
/* -------------------------------------------------------------------------- */
exports.deleteComment = async (req, res) => {
  try {
    let { commentId } = req.body;

    let { boardId, cardId } = req.params;

    await Comment.deleteOne({ _id: commentId });

    let card = await Card.findById(cardId);

    card.comments = card.comments.filter((item) => item._id !== commentId);
    await card.save();

    return res.send({ success: true, status: 200, data: await oneBoardData(boardId) });
  } catch (err) {
    return res.send({ success: false, status: 500 });
  }
};
