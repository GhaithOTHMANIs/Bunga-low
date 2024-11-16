const express = require('express');
const AuthService = require('./services/AuthService.js');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');






const app = express();
const port = 3000;
dotenv.config();
app.set('view engine', 'ejs');
app.set('views', './templates');





//middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


//routes
const authRouter = express.Router();
const bungalowRouter = express.Router();
const reservationRouter = express.Router();




// Auth routes
authRouter.get('/', (req, res) => {
    res.redirect('http://localhost/api/login');
});
authRouter.get('/login', (req, res) => {
    res.render('login');  
});
authRouter.post('/login', (req, res) => {
    const token = AuthService.generateAccessToken({ username: req.body.username, role: "AGENT"});
    res.cookie('jwt', token, { maxAge: 3600000, httpOnly: true });
    res.render('dashboard');
});
authRouter.post('/signup', (req, res) => {
    res.send('Method not implemented yet!');
});
authRouter.post('/logout', (req, res) => {
    res.send('Method not implemented yet!');
});











// Other routes

bungalowRouter.get('/all',AuthService.authenticateToken , (req, res) => {
    res.send('1st tested(all bungalows)');
});

bungalowRouter.get('/:id', (req, res) => {
    res.send('Method not implemented yet!');
});
bungalowRouter.post('/', (req, res) => {
    res.send('Method not implemented yet!');
});
bungalowRouter.put('/:id', (req, res) => {
    res.send('Method not implemented yet!');
});
bungalowRouter.delete('/:id', (req, res) => {
    res.send('Method not implemented yet!');
});
bungalowRouter.post('/:id/geo', (req, res) => {
    res.send('Method not implemented yet!');
});






reservationRouter.get('/all', (req, res) => {
    res.send('Method not implemented yet!');
});
reservationRouter.get('/:id', (req, res) => {
    res.send('Method not implemented yet!');
});
reservationRouter.post('/approve', (req, res) => {
    res.send('Method not implemented yet!');
});
reservationRouter.post('/decline', (req, res) => {
    res.send('Method not implemented yet!');
});
reservationRouter.delete('/:id', (req, res) => {
    res.send('Method not implemented yet!');
});













app.use('/api', authRouter);
app.use('/api/bungalow', bungalowRouter);
app.use('/api/reservation', reservationRouter);

// Server running
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});







