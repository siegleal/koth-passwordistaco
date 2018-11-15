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
        console.log(entities);
        var responded = entities.map(p => p.email);
        
        res.json(USERS.filter(u => !responded.includes(u.email)).map(u => u.name));
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

router.put('/makePick', (req, res) => {
    var week = parseInt(req.body.week);
    var email = req.body.email;
    var team = req.body.team;

    makePick({week: week, email: email, team: team} , res);

});

module.exports = router;
