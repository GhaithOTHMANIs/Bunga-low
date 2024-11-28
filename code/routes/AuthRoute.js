const express = require('express');
const AuthService = require('../services/AuthService.js');

const port = 3000;


const route = express.Router();



route.get('/', (req, res) => {
    res.redirect(`http://localhost:${port}/login`);
});
route.get('/login', (req, res) => {
    res.render('login');  
});
route.post('/login', (req, res) => {
    const token = AuthService.generateAccessToken({ username: req.body.username, role: "AGENT"});
    res.cookie('jwt', token, { maxAge: 3600000, httpOnly: true });
    res.render('dashboard');
});
route.get('/signup', (req, res) => {
    res.render('signup');  
});
route.post('/signup', (req, res) => {
    res.send('Method not implemented yet!');
});
route.post('/logout',AuthService.authenticateToken , (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/login');
});

module.exports = route;
