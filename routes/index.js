const app = require('express')();

const userRouter = require('./user');
const boardRouter = require('./board');
const listRouter = require('./lists');
const cardRouter = require('./cards');

app.use('/', userRouter);
app.use('/board', boardRouter);
app.use('/list', listRouter);
app.use('/card', cardRouter);

module.exports = app;
