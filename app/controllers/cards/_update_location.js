const { Card, List } = require('../../models');
const { oneBoardData } = require('../../utils');

/* -------------------------------------------------------------------------- */
/* ----------------------- update card location ----------------------------- */
/* -------------------------------------------------------------------------- */
exports.updateLocation = async (req, res) => {
  try {
    let { boardId, cardId } = req.params;
    let { cardSourceIndex, cardDestIndex, listSourceId, listDestId } = req.body;

    let sourceList = await List.findById(listSourceId);

    // * store card in variable card
    let card = sourceList.cards.filter((item, i) => String(item) === String(cardId))[0];

    // * remove card from source list
    let sourceArr = sourceList.cards.filter((item, i) => i !== cardSourceIndex);
    sourceList.cards = sourceArr;
    await sourceList.save();

    // * add card to destination list
    let destList = await List.findById(listDestId);
    let destArr = destList.cards;
    destArr.splice(cardDestIndex, 0, card);
    destList.cards = destArr;
    await destList.save();

    return res.send({ success: true, status: 200, data: await oneBoardData(boardId) });
  } catch (err) {
    return res.send({ success: false, status: 500 });
  }
};
