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

const USERS = [
	{"name": "Alex", "email": "alexander.pavlakis90@gmail.com"},
	{"name": "Andrew", "email": "asiegle@gmail.com"},
	{"name": "Michael", "email": "seagull798@gmail.com"},
	{"name": "Joel", "email": "joeljones531@gmail.com"},
	{"name": "Geralyn", "email": "geralynroz1529@gmail.com"},
	{"name": "Eric", "email": "egibbons1990@gmail.com"},
	{"name": "Aly", "email": "alyg@dayspringvalpo.org"},
	{"name": "Nick", "email": "nickwest1016@gmail.com"},
	{"name": "Erica", "email": "ericawest1012@gmail.com"},
	{"name": "Chelsea", "email": "cdoy1125@gmail.com"},
	{"name": "Thomas", "email": "teumerthomas74@gmail.com"},
	{"name": "Matt", "email": "moleary5252@gmail.com"},
	{"name": "Erin", "email": "emcoulson24@gmail.com"}
];

function getAllUsers(){
	return USERS;
}

router.get('/getNotResponded/:week', (req, res) => {
	var week = parseInt(req.params.week);
	
	const datastore = getDatastore();

    const query = datastore.createQuery('Pick');

    query.filter('week', week);

    datastore.runQuery(query, (err, entities) => {
        if (err){
            console.log('Error getting entities: ' + err);
        }
        var responded = entities.map(p => p.email);
        
        res.json(USERS.filter(u => !responded.includes(u.email)).map(u => u.name));
    });

	
});

router.put('/weeklyscore/', (req, res) => {
    var datastore = getDatastore();


    // The kind for the new entity
    const kind = 'WeeklyScore';
    // The Cloud Datastore key for the new entity

    let entities = req.body.map( data => {
        var key = datastore.key([kind, data.week + data.team])
        // Prepares the new entity
        return {
            key: key,
            data: {
                week: parseInt(data.week),
                team: data.team,
                score: data.score,
                diff: data.diff
            },
        };
    })

    console.log(entities);
	

    // Saves the entity
    datastore
        .upsert(entities)
        .then(() => {
            res.status(200).send();
        })
        .catch(err => {
            console.error('ERROR:', err);
            res.status(500).send();
        });
});

router.put('/schedule/', (req, res) => {
    console.log('putting matchup');
    const datastore = getDatastore();


    // The kind for the new entity
    const kind = 'Matchup';
    // The Cloud Datastore key for the new entity

    let entities = req.body.map( data => {
        var key = datastore.key([kind, data.week + data.awayTeam + data.homeTeam])
        // Prepares the new entity
        return {
            key: key,
            data: {
                week: parseInt(data.week),
                homeTeam: data.homeTeam,
                awayTeam: data.awayTeam,
                homeScore: data.homeScore,
                awayScore: data.awayScore
            },
        };
    })

    // Saves the entity
    datastore
        .save(entities)
        .then(() => {
            res.status(200).send();
        })
        .catch(err => {
            console.error('ERROR:', err);
            res.status(500).send();
        });
});

router.get('/schedule/:week', (req, res) => {
    var week = parseInt(req.params.week);
	const datastore = getDatastore();

    const query = datastore.createQuery('Matchup');

    query.filter('week', week);

    datastore.runQuery(query, (err, entities) => {
        if (err){
            console.log('Error getting entities: ' + err);
        }

        res.json(entities);
    });
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

        res.json(entities);
    });


});

router.get('/diff/:team/:week', (req, res) => {
    let team = req.params.team;
    let week = parseInt(req.params.week);
    
    const datastore = getDatastore();

    const query = datastore.createQuery('WeeklyScore');

    query.filter('week', week);
    query.filter('team', team);


    datastore.runQuery(query, (err, entities) => {
        if (err){
            console.log('Error getting entities: ' + err);
        }
        if (entities && entities.length === 1){
            console.log(entities[0].team + ': ' + entities[0].diff);
            res.json(entities[0].diff);
        }
        else {
            res.json(0);
        }
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
    let points = inputPick.points;
    if (points === undefined){
        points = 0;
    }

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
            points: parseInt(points)
        },
    };

    console.log(pick)

    // Saves the entity
    datastore
        .save(pick)
        .then(() => {
            console.log(`Saved pick: ${pick.data.email} and ${pick.data.team}`);
            res.status(200).send();
        })
        .catch(err => {
            console.error('ERROR:', err);
            res.status(500).send();
        });

}

router.get('/storeSchedule', (req, res) => {
	 const datastore = getDatastore();

    // The kind for the new entity
    const kind = 'Matchup';
    // The Cloud Datastore key for the new entity
    
    var fs = require('fs');
        var schedule = JSON.parse(fs.readFileSync('schedule.json', 'utf8'));
        
    for (var i = 0; i < schedule.length; i++){
    var currmatchup = schedule[i];

	var key = datastore.key([kind, currmatchup.week+currmatchup.awayTeam+currmatchup.homeTeam])
    // Prepares the new entity
    const matchup = {
        key:key ,
        data: {
            week: parseInt(currmatchup.week),
            homeTeam: currmatchup.homeTeam,
            awayTeam: currmatchup.awayTeam,
            homeScore: 0,
            awayScore: 0
        },
    };

    // Saves the entity
    datastore
        .save(matchup)
        .then(() => {
            console.log(`Saved ${matchup.data.week}: ${matchup.data.awayTeam} at ${matchup.data.homeTeam}`);
            res.status(200).send();
        })
        .catch(err => {
            console.error('ERROR:', err);
            res.status(500).send();
        });
    }


});

router.put('/pick', (req, res) => {
    var week = parseInt(req.body.week);
    var email = req.body.email;
    var team = req.body.team;
    var points = req.body.points

        makePick({ week: week, email: email, team: team, points: points }, res);


});

module.exports = router;
