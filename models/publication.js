'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PublicationSchema = Schema({
  imagen: String,
  texto: String,
  publicationDate: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('Publication', PublicationSchema)
