const express = require('express');
const router = express.Router();

const { cardControllers } = require('../../app/controllers');
const { isAuth, isBoardAdmin, isBoardMember } = require('../../app/middlewares');
const { upload } = require('../../app/utils');

router.post('/:boardId', isAuth, cardControllers.create);

router.put('/updateLocation/:boardId/:cardId', isAuth, cardControllers.updateLocation);

router.put('/:boardId/:cardId', isAuth, upload.single('attachments'), cardControllers.update);

router.patch('/create/:boardId/:cardId', isAuth, cardControllers.createComment);

router.patch('/remove/:boardId/:cardId', isAuth, cardControllers.deleteComment);

router.delete('/:boardId/:listId/:cardId', isAuth, cardControllers.delete);

module.exports = router;
