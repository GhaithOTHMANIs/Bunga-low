const mongoose = require('mongoose');
const Person = require('./Person'); 
const Schema = mongoose.Schema;



const clientSchema = new Schema({
  username: { type: String, required: true , unique: true },
  password: { type: String, required: true },
});

const Client = Person.discriminator('Client', clientSchema);


module.exports =  Client ;
