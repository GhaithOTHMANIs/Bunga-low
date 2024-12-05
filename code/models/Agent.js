const mongoose = require('mongoose');
const Person = require('./Person'); 
const Schema = mongoose.Schema;

const agentSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Agent = Person.discriminator('Agent', agentSchema);

module.exports = Agent;
