const express = require('express');
const bodyparser = require('body-parser');
const fs = require('fs');
const router = express.Router();

router.get('/schedule', (req, res) => {
	var schedule = JSON.parse(fs.readFileSync('schedule.json', 'utf8'));
	res.json(schedule);
});

function getDatastore(){

    // Imports the Google Cloud client library
    const Datastore = require('@google-cloud/datastore');

    // Your Google Cloud Platform project ID
    const projectId = 'passwordistaco-218204';

    // Creates a client
     return new Datastore({
        projectId: projectId,
    });
}

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

router.put('/batchPicks/', (req, res) => {
    let email = req.body.email;
    let picks = req.body.picks;

    const datastore = getDatastore();
    for (var i = 1; i < picks.length + 1; i++){
        makePick({week: i, email: email, team: picks[i-1]}, res);
    }
});

router.get('/getPicks/:week', (req, res) =>{
    var week = parseInt(req.params.week);

    const datastore = getDatastore();

    const query = datastore.createQuery('Pick');

    query.filter('week', week);

    datastore.runQuery(query, (err, entities) => {
        if (err){
            console.log('Error getting entities: ' + err);
        }
        console.log(entities);
        res.json(entities);
    });


});

router.get('/getPicks', (req, res) =>{
    var email = req.query.e;
    var currWeek = parseInt(req.query.w);
    
    if (email === undefined){
        res.status(400).send();
        return;
    }

    const datastore = getDatastore();

    const query = datastore.createQuery('Pick');

    query.filter('email', email);

    datastore.runQuery(query, (err, entities) => {
        if (err){
            console.log('Error getting entities: ' + err);
        }
        if (req.query.w !== undefined){
        entities = entities.filter(p => p.week < currWeek);
    	}

        entities.sort(function(a,b) {return a.week - b.week;});
        res.json(entities);
    });


});

function makePick(inputPick, res){
    let week = inputPick.week;
    let email = inputPick.email;
    let team = inputPick.team;

    const datastore = getDatastore();

    // The kind for the new entity
    const kind = 'Pick';
    // The name/ID for the new entity
    const name = week + email;
    // The Cloud Datastore key for the new entity
    const key = datastore.key([kind, name]);

    // Prepares the new entity
    const pick = {
        key:key,
        data: {
            week: parseInt(week),
            email: email,
            team: team,
            points: 0
        },
    };

    // Saves the entity
    datastore
        .save(pick)
        .then(() => {
            console.log(`Saved ${pick.key.name}: ${pick.data.email} and ${pick.data.team}`);
            res.status(200).send();
        })
        .catch(err => {
            console.error('ERROR:', err);
            res.status(500).send();
        });

}

router.put('/makePick', (req, res) => {
    var week = parseInt(req.body.week);
    var email = req.body.email;
    var team = req.body.team;

    makePick({week: week, email: email, team: team} , res);

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
