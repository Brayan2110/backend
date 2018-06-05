'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PublicationSchema = Schema({
  user: {type: mongoose.Schema.Types.ObjectId , ref: 'User' ,required: true},
  imagen: String,
  texto: String,
  publicationDate: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('Publication', PublicationSchema)
