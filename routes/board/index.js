const express = require('express');
const router = express.Router();

const { boardControllers } = require('../../app/controllers');
const { isAuth, isBoardAdmin, isBoardMember } = require('../../app/middlewares');

router.post('/', isAuth, boardControllers.create);

router.get('/', isAuth, boardControllers.list);

router.get('/:boardId', isAuth, isBoardMember, boardControllers.getOne);

router.patch('/:boardId', isAuth, isBoardAdmin, boardControllers.update);

module.exports = router;
