const express = require('express');
const router = express.Router();

const { listControllers } = require('../../app/controllers');
const { isAuth, isBoardAdmin, isBoardMember } = require('../../app/middlewares');

router.post('/:boardId', isAuth, isBoardMember, listControllers.create);

router.patch('/:boardId/:listId', isAuth, isBoardMember, listControllers.update);

router.put('/:boardId', isAuth, isBoardMember, listControllers.updateOrder);

router.delete('/:boardId/:listId', isAuth, isBoardAdmin, listControllers.delete);

module.exports = router;
