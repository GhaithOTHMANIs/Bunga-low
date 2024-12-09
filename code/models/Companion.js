const mongoose = require('mongoose');
const Person = require('./Person'); 
const Schema = mongoose.Schema;



const companionSchema = new Schema({
    
});

const Companion = Person.discriminator('Companion', companionSchema);

module.exports =  Companion ;
