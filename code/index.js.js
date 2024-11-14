const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const helmet = require('helmet');



const app = express();
const port=3000;

//middleware
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(helmet());
//app.use('/pages', express.static(''));
app.use(express.urlencoded({ extended: true })); 


//routes



app.get('/api/', (req, res) => {
    res.redirect('http://localhost/api/login');
});
app.post('/api/login', (req, res) => {
    res.send('Method not implemented yet!');
});
app.post('/api/signup', (req, res) => {
    res.send('Method not implemented yet!');
});
app.post('/api/logout', (req, res) => {
    res.send('Method not implemented yet!');
});
app.get('/api/bungalows', (req, res) => {
    res.send('Method not implemented yet!');
});
app.get('/api/bungalows/{id}', (req, res) => {
    res.send('Method not implemented yet!');
});
app.post('/api/bungalows/{id}/rent', (req, res) => {
    res.send('Method not implemented yet!');
});
app.post('/api/bungalows/{id}/geo', (req, res) => {
    res.send('Method not implemented yet!');
});
app.get('/api/rentals/all', (req, res) => {
    res.send('Method not implemented yet!');
});
app.delete('/api/rentals', (req, res) => {
    res.send('Method not implemented yet!');
});





//server running
app.listen(port,() =>{
    console.log(`server running at http://localhost:${port}/`);
    }
);