'use strict'

const express = require('express')
const publicationCtrl = require('../controllers/publication')
const userCtrl = require('../controllers/user')
const messageCtrl = require('../controllers/message')
const auth = require('../middlewares/auth')
const api = express.Router()

api.get('/user', userCtrl.usuarios)
api.get('/publication', auth, publicationCtrl.getPublications)
api.get('/publication/:publicationId', publicationCtrl.getPublication)
api.post('/publication', auth, publicationCtrl.savePublication)
api.put('/publication/:publicationId', auth, publicationCtrl.updatePublication)
api.delete('/publication/:publicationId', auth, publicationCtrl.deletePublication)
api.get('/message', auth, messageCtrl.getMessages)
api.post('/message', auth, messageCtrl.saveMessage)
api.delete('/message/:messageId', auth, messageCtrl.deleteMessage)
api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)
api.get('/private', auth, (req, res) => {
  res.status(200).send({ message: 'Tienes acceso' })
})

module.exports = api
