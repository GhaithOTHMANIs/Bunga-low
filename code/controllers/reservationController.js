const mongoose = require('mongoose');
const Reservation = require('../models/Reservation');
const Bungalow = require('../models/Bungalow');

async function getAllReservations(req, res) {
  try {
    const reservations = await Reservation.find().populate('bungalow');
    res.status(200).render('reservations', { reservations });
  } catch (err) {
    console.error('Error retrieving reservations:', err);
    res.status(500).json({ error: 'Error retrieving reservations', details: err.message });
  }
}

async function getReservationDetails(req, res) {
  const id = req.params.id;
  try {
    const reservation = await Reservation.findById(id).populate('bungalow');
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    res.status(200).render('reservation_detail', { reservation });
  } catch (err) {
    console.error('Error retrieving reservation details:', err);
    res.status(500).json({ error: 'Error retrieving reservation details', details: err.message });
  }
}

async function addReservationPage(req, res) {
  try {
    const bungalows = await Bungalow.find();
    res.render('reservation_create', { bungalows });
  } catch (err) {
    console.error('Error loading reservation creation page:', err);
    res.status(500).json({ error: 'Error loading page', details: err.message });
  }
}

async function addReservation(req, res) {
  const { bungalowId, user, startDate, endDate, status } = req.body;

  if (new Date(endDate) <= new Date(startDate)) {
    return res.status(400).json({ error: 'End date must be after the start date.' });
  }

  try {
    const reservation = new Reservation({
      bungalow: bungalowId,
      user,
      startDate,
      endDate,
      status,
    });

    await reservation.save();
    res.status(201);
  } catch (err) {
    console.error('Error adding reservation:', err);
    res.status(500).json({ error: 'Error adding reservation', details: err.message });
  }
}

async function editReservationPage(req, res) {
  const { id } = req.params;

  try {
    const reservation = await Reservation.findById(id).populate('bungalow');
    const bungalows = await Bungalow.find(); 

    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    res.render('reservation_edit', { reservation, bungalows });
  } catch (err) {
    console.error('Error loading reservation edit page:', err);
    res.status(500).json({ error: 'Error loading reservation edit page', details: err.message });
  }
}

async function editReservation(req, res) {
  const { id } = req.params;
  const { bungalowId, user, startDate, endDate, status } = req.body;

  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(id, {
      bungalow: bungalowId,
      user,
      startDate,
      endDate,
      status,
    }, { new: true });

    if (!updatedReservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    res.json({ message: 'Reservation updated successfully!' });
  } catch (err) {
    console.error('Error updating reservation:', err);
    res.status(500).json({ error: 'Error updating reservation', details: err.message });
  }
}


async function deleteReservation(req, res) {
  const { id } = req.params;

  try {
    const deletedReservation = await Reservation.findByIdAndDelete(id);
    if (!deletedReservation) {
      return res.status(404).json({ error: 'Reservation not found or already deleted.' });
    }
    res.status(200).json({ message: 'Reservation deleted successfully!', deletedReservation });
  } catch (err) {
    console.error('Error deleting reservation:', err);
    res.status(500).json({ error: 'Error deleting reservation', details: err.message });
  }
}

async function approveReservation(req, res) {
  const { id } = req.params;

  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      id,
      { status: 'confirmed' },
      { new: true }
    );
    if (!updatedReservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    res.status(200).json({ message: 'Reservation approved successfully!', updatedReservation });
  } catch (err) {
    console.error('Error approving reservation:', err);
    res.status(500).json({ error: 'Error approving reservation', details: err.message });
  }
}

async function declineReservation(req, res) {
  const { id } = req.params;

  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      id,
      { status: 'cancelled' },
      { new: true }
    );
    if (!updatedReservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    res.status(200).json({ message: 'Reservation declined successfully!', updatedReservation });
  } catch (err) {
    console.error('Error declining reservation:', err);
    res.status(500).json({ error: 'Error declining reservation', details: err.message });
  }
}

module.exports = {
  getAllReservations,
  getReservationDetails,
  addReservationPage,
  addReservation,
  editReservation,
  editReservationPage,
  deleteReservation,
  approveReservation,
  declineReservation,
};
