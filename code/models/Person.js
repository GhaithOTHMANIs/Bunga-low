const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  NIC: { type: String, required: true },
  phone: { type: String },
  dateOfBirth: { type: Date, required: true },
}, { discriminatorKey: 'role' }); 

const Person = mongoose.model('Person', personSchema);

module.exports = Person;