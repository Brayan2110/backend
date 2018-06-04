'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = Schema({
  emisor: {type: mongoose.Schema.Types.ObjectId , ref: 'User' ,required: true},
  texto: String,
  receptor: {type: mongoose.Schema.Types.ObjectId , ref: 'User' ,required: true}
})

module.exports = mongoose.model('Message', MessageSchema)