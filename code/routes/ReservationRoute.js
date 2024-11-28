const express = require('express');
const dotenv = require('dotenv');
const AuthService = require('../services/AuthService.js');



const route = express.Router();




route.get('/all',AuthService.authenticateToken , (req, res) => {
    res.send('Method not implemented yet!');
});
route.get('/:id',AuthService.authenticateToken , (req, res) => {
    res.send('Method not implemented yet!');
});
route.post('/approve',AuthService.authenticateToken , (req, res) => {
    res.send('Method not implemented yet!');
});
route.post('/decline',AuthService.authenticateToken , (req, res) => {
    res.send('Method not implemented yet!');
});
route.delete('/:id',AuthService.authenticateToken , (req, res) => {
    res.send('Method not implemented yet!');
});


module.exports = route;