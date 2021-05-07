const { User, Board } = require('../../models');

// * ─── PREPARE THE DATA FOR RESPONSE WHEN UPDATE ON USER BOARDS ───────────────────
exports.allBoardsData = async (userId) => {
  try {
    let user = await User.findById(userId).populate({
      path: 'boards',
      select: { title: 1, starred: 1, createdBy: 1, background: 1 },
    });

    // * split the boards in 3 arrays
    // ? starred for starred boards
    // ? personal for all boards
    let starred = [],
      personal = [];

    user.boards.map((board) => {
      board.starred ? starred.push(board) : null;
      personal.push(board);
      return;
    });
    return { starred, personal };
  } catch (err) {
    return err;
  }
};
