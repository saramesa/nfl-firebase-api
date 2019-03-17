import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as firebaseHelper from 'firebase-functions-helper';
import * as express from 'express';
import * as bodyParser from "body-parser";

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const app = express();
const main = express();

main.use('/api', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

const nflTeams = 'teams';

export const webApi = functions.https.onRequest(main);


// Add new team
app.post('/teams', (req, res) => {
    firebaseHelper.firestore
        .creatNewDocument(db, nflTeams, req.body);
    res.send('Create a new team');
})

// View a team
app.get('/teams/:team', (req, res) => {
    firebaseHelper.firestore
        .getDocument(db, nflTeams, req.params.team)
        .then(doc => res.status(200).send(doc));
})

// View all teams
app.get('/teams', (req, res) => {
    firebaseHelper.firestore
        .backup(db, nflTeams)
        .then(data => res.status(200).send(data))
})

// Delete a team 
app.delete('/teams/:team', (req, res) => {
    firebaseHelper.firestore
        .deleteDocument(db, nflTeams, req.params.team);
    res.send('Contact is deleted');
})