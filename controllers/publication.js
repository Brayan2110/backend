'use strict'

const Publication = require('../models/publication')

function getPublication (req, res) {
  let publicationtId = req.params.publicationtId

  Publication.findById(publicationtId, (err, publication) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!publication) return res.status(404).send({message: `La publicacion no existe`})

    res.status(200).send({ publication })
  })
}

function getPublications (req, res) {
  Publication.find({}, (err, publications) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!publications) return res.status(404).send({message: 'No existen publicaciones'})

    res.send(200, { publications })
  })
}

function savePublication (req, res) {
  console.log('POST /api/publication')
  console.log(req.body)

  let publication = new Publication()
  publication.usuario = req.body.usuario
  publication.imagen = req.body.imagen
  publication.texto = req.body.texto

  publication.save((err, publicationStored) => {
    if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err} `})

    res.status(200).send({ publication: publicationStored })
  })
}

function updatePublication (req, res) {
  let publicationtId = req.params.publicationId
  let update = req.body

  Publication.findByIdAndUpdate(publicationId, update, (err, publicationUpdated) => {
    if (err) res.status(500).send({message: `Error al actualizar la publicacion: ${err}`})

    res.status(200).send({ publication: publicationUpdated })
  })
}

function deletePublication (req, res) {
  let publicationId = req.params.publicationId

  Publication.find(publicationId, (err, publication) => {
    if (err) res.status(500).send({message: `Error al borrar la publicacion: ${err}`})

    publication.remove(err => {
      if (err) res.status(500).send({message: `Error al borrar la publicacion: ${err}`})
      res.status(200).send({message: 'La publicacion ha sido eliminado'})
    })
  })
}

function userPublications (req,res){
  Publication.find({ usuario: req.params.userId }, (err, publications) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!publicationa) return res.status(404).send({message: `No tiene publicaciones`})

    res.status(200).send({ publications })
  })
}

module.exports = {
  getPublication,
  getPublications,
  savePublication,
  updatePublication,
  deletePublication,
  userPublications
}
