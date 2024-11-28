const express = require('express');
const dotenv = require('dotenv');
const authRouter = require('./routes/AuthRoute.js');
const bungalowRouter = require('./routes/BungalowRoute.js');
const reservationRouter = require('./routes/ReservationRoute.js');
const cookieParser = require('cookie-parser');

var MongoClient = require('mongodb').MongoClient;
var uri = 'mongodb://localhost/:27017/Main';
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        console.log("Connected to Main db!");
    } finally {
        await client.close();
    }
}

run().catch(console.error);


const app = express();
const port = 3000;
dotenv.config();
app.set('view engine', 'ejs');
app.set('views', './templates');
app.use(express.urlencoded({ extended: true }));  
app.use(express.json());  
app.use(cookieParser());



app.use('/', authRouter);
app.use('/bungalow', bungalowRouter);
app.use('/reservation', reservationRouter);




// Server running
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});







