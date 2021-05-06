const { List } = require('../../models');
const { oneBoardData } = require('../../utils');

/* -------------------------------------------------------------------------- */
/* -------------------------- update lists order----------------------------- */
/* -------------------------------------------------------------------------- */
exports.updateOrder = async (req, res) => {
  try {
    // * get data from the request
    let { source, destination } = req.body;
    let sourceList = await List.findById(source.source);
    let destinationList = await List.findById(destination.destination);

    // * change the orderInBoard value for each list and the onBoardData will return it sortable
    sourceList.orderInBoard = destination.destinationIndex;
    destinationList.orderInBoard = source.sourceIndex;

    await sourceList.save();
    await destinationList.save();

    return res.send({ success: true, status: 200, data: await oneBoardData(req.params.boardId) });
  } catch (err) {
    return res.send({ success: false, status: 500 });
  }
};
