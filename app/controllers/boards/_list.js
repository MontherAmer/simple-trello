const { allBoardsData } = require('../../utils');

// * ─── LIST ALL BOARDS OF ONE USER ────────────────────────────────────────────────
exports.list = async (req, res) => {
  try {
    let data = await allBoardsData(req._id);

    return res.send({ success: true, status: 200, data });
  } catch (err) {
    return res.send({ success: false, status: 500 });
  }
};
