const { List } = require('../../models');
const { oneBoardData } = require('../../utils');
/* -------------------------------------------------------------------------- */
/* ---------------------------- update list name ---------------------------- */
/* -------------------------------------------------------------------------- */
exports.update = async (req, res) => {
  try {
    let { title } = req.body;

    let { boardId, listId } = req.params;

    let list = await List.findById(listId);

    list.title = title;

    await list.save();

    return res.send({ success: true, status: 200, data: oneBoardData(boardId) });
  } catch (err) {
    return res.send({ success: false, status: 500 });
  }
};
