const { Card, User } = require('../../models');
const { oneBoardData } = require('../../utils');

/* -------------------------------------------------------------------------- */
/* ------------------------------ UPDATE CARD ------------------------------- */
/* -------------------------------------------------------------------------- */
exports.update = async (req, res) => {
  try {
    let { cardId, boardId } = req.params;
    let { title, member, description, checkList, attachmentsR, label } = req.body;
    let card = await Card.findById(cardId);

    card.title = title ? title : card.title;
    card.label = label ? label : card.label;
    card.description = description ? description : card.description;
    card.description = description ? description : card.description;
    attachmentsR || attachmentsR == 0 ? (card.attachments = card.attachments.filter((item, i) => i != attachmentsR)) : null;
    checkList ? (card.checkList = JSON.parse(checkList)) : null;
    req.file ? (card.attachments = card.attachments.concat(req.file.location)) : null;

    if (member) {
      let user = await User.findOne({ email: member });
      if (user) card.members = card.members.concat(user._id);
    }

    await card.save();

    let cardData = await Card.findById(cardId).populate({ path: 'members' });

    return res.send({ success: true, status: 200, data: await oneBoardData(boardId), cardData });
  } catch (err) {
    console.error(err);
    return res.send({ success: false, status: 500 });
  }
};
