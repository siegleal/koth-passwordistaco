const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const fs = require('fs');
const router = express.Router();

router.get('/schedule', (req, res) => {
	var fs = require('fs');
	var schedule = JSON.parse(fs.readFileSync('schedule.json', 'utf8'));
	res.json(schedule);
});


router.get('/schedule/:week', (req, res) => {
    var week = parseInt(req.params.week);
    if (week < 1 || week > 17){
        res.sendStatus(500);
    } else {
        var fs = require('fs');
        var schedule = JSON.parse(fs.readFileSync('schedule.json', 'utf8'));
        var filtered = schedule.filter(m => m.week === week);
        res.json(filtered);
    }
});

/* GET api listing. */
router.post('/makeMatchup', (req, res) => {
    var week =  parseInt(req.body.week);
    var homeTeam = req.body.homeTeam;
    var awayTeam = req.body.awayTeam;

    // Imports the Google Cloud client library
    const Datastore = require('@google-cloud/datastore');

    // Your Google Cloud Platform project ID
    const projectId = 'passwordistaco-218204';

    // Creates a client
    const datastore = new Datastore({
        projectId: projectId,
    });

    // The kind for the new entity
    const kind = 'MatchupScore';
    // The name/ID for the new entity
    const name = week+homeTeam+awayTeam;
    // The Cloud Datastore key for the new entity
    const scoreKey = datastore.key([kind, name]);

    // Prepares the new entity
    const score = {
        key:scoreKey,
        data: {
            week: parseInt(week),
            homeTeam: homeTeam,
            awayTeam: awayTeam,
            homeScore: 0,
            awayScore: 0
        },
    };

    // Saves the entity
    datastore
        .save(score)
        .then(() => {
            console.log(`Saved ${score.key.name}: ${score.data.homeTeam} and ${score.data.awayTeam}`);
            res.status(200).send();
        })
        .catch(err => {
            console.error('ERROR:', err);
            res.status(500).send();
        });
});

module.exports = router;
