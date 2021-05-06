const { oneBoardData } = require('../../utils');

// * ─── GET DATA OF ONE BOARD ──────────────────────────────────────────────────────
exports.getOne = async (req, res) => {
  try {
    let data = await oneBoardData(req.params.boardId);

    return res.send({ success: true, status: 200, data });
  } catch (err) {
    return res.send({ success: false, status: 500 });
  }
};
