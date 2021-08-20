const express = require('express');
const app = express();
const Game = require('./GameLogic');
const newGame = new Game();

app.use(express.static(__dirname));
app.use(express.json());

app.get('/api/getScores', (req, res) => {
    const topScores = newGame.getTopScores();

    if (topScores) {
        res.status(200).json(topScores)
    }
});

app.post('/api/submitEntry', (req, res) => {
    const scoredEntry = newGame.submitEntry(req.body.name, req.body.word);

    if (scoredEntry.success) {
        res.status(200).json({
            msg: scoredEntry.msg
        });
    }
});

const port = 3000;
app.listen(port, function () {
    console.log('Server', process.pid, 'listening on port', port);
});
