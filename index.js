require('dotenv').config();

const Telebot = require('telebot');
const bot = new Telebot({
	token: process.env.bot_token,
	limit: 1000
});

const express = require('express');
const bodyParser = require('body-parser');

const middlewares = require('./middlewares');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.post('/baseutils/:ChatID', (req, res, next) => {
    try {
        
        bot.sendMessage(req.params.ChatID, req.body.msg, {parseMode: req.body.format, webPreview: !req.body.disablePreview});

        res.status(200);
        res.json({ ok: true });
    } catch (err) {
        next(err);
    }
});

//Load error handling middleware
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.listen(process.env.port, () => {
    /* eslint-disable no-console */
    console.log('[system]', `Server started on port ${process.env.port}`);
    /* eslint-enable no-console */
});

  //http://localhost/baseutils/-1001428173160