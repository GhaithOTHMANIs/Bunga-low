const express = require('express');
const dotenv = require('dotenv');
const AuthController = require('../middlewares/authentification.js');
const reservationController = require('../controllers/reservationController.js');



const route = express.Router();




route.get('/all',AuthController.authenticateToken ,reservationController.getAllReservations);

route.post('/approve/:id',AuthController.authenticateToken , reservationController.approveReservation);

route.post('/decline/:id',AuthController.authenticateToken , reservationController.declineReservation);

route.get('/edit/:id',AuthController.authenticateToken , reservationController.editReservationPage);

route.post('/edit/:id',AuthController.authenticateToken , reservationController.editReservation);

route.get('/add',AuthController.authenticateToken , reservationController.addReservationPage);

route.post('/add',AuthController.authenticateToken , reservationController.addReservation);

route.get('/:id',AuthController.authenticateToken , reservationController.getReservationDetails);

route.delete('/:id',AuthController.authenticateToken , reservationController.deleteReservation);


module.exports = route;