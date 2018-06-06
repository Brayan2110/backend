'use strict'

const Message = require('../models/message')

function getMessages (req, res) {
  Message.find({}, (err, messages) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!messages) return res.status(404).send({message: 'No existen mensajes'})

    res.send(200, { messages })
  })
}

function saveMessage (req, res) {
  console.log('POST /api/message')
  console.log(req.body)

  let message = new Message()
  message.emisor = req.body.emisor
  message.texto = req.body.texto
  message.receptor = req.body.receptor

  message.save((err, messageStored) => {
    if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err} `})

    res.status(200).send({ message: messageStored })
  })
}

function deleteMessage (req, res) {
  let messageId = req.params.messageId

  Message.findById(messageId, (err, message) => {
    if (err) res.status(500).send({message: `Error al borrar el mensaje: ${err}`})

    message.remove(err => {
      if (err) res.status(500).send({message: `Error al borrar el mensaje: ${err}`})	
      res.status(200).send({message: 'El mensaje ha sido eliminado'})
    })
  })
}

function conversacion(req, res){
	Message.find({ $or: [{emisor: req.params.userId}, {receptor: req.params.userId}] }, (err, messages) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!messages) return res.status(404).send({message: `No Existen mensajes`})

    res.status(200).send({ messages })
  })
}

module.exports = {
  getMessages,
  saveMessage,
  deleteMessage,
  conversacion
}