const { Board } = require('../../models');

exports.oneBoardData = async (boardId) => {
  try {
    let board = await Board.findById(boardId).populate([
      {
        path: 'createdBy',
        select: { name: 1, email: 1 },
      },
      {
        path: 'members',
        select: { name: 1, email: 1 },
      },
      {
        path: 'lists',
        options: { sort: { orderInBoard: 1 } },
        populate: {
          path: 'cards',
          populate: [
            {
              path: 'members',
            },
            {
              path: 'comments',
              populate: {
                path: 'user',
              },
            },
          ],
        },
      },
    ]);
    return board;
  } catch (err) {
    return err;
  }
};
