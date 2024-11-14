const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const helmet = require('helmet');

const app = express();
const port = 3000;




//middleware
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

//routes
const authRouter = express.Router();
const bungalowRouter = express.Router();
const rentalRouter = express.Router();

// Auth routes
authRouter.get('/', (req, res) => {
    res.redirect('http://localhost/api/login');
});
authRouter.post('/login', (req, res) => {
    res.send('Method not implemented yet!');
});
authRouter.post('/signup', (req, res) => {
    res.send('Method not implemented yet!');
});
authRouter.post('/logout', (req, res) => {
    res.send('Method not implemented yet!');
});

// Bungalows routes
bungalowRouter.get('/', (req, res) => {
    res.send('Method not implemented yet!');
});
bungalowRouter.get('/:id', (req, res) => {
    res.send('Method not implemented yet!');
});
bungalowRouter.post('/:id/rent', (req, res) => {
    res.send('Method not implemented yet!');
});
bungalowRouter.post('/:id/geo', (req, res) => {
    res.send('Method not implemented yet!');
});

rentalRouter.get('/all', (req, res) => {
    res.send('Method not implemented yet!');
});
rentalRouter.delete('/', (req, res) => {
    res.send('Method not implemented yet!');
});

// Register routers with base paths
app.use('/api', authRouter);
app.use('/api/bungalows', bungalowRouter);
app.use('/api/rentals', rentalRouter);

// Server running
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});







