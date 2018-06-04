'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NewsSchema = Schema({
  imagen: String,
  texto: String,
  newsDate: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('News', NewsSchema)