'use strict'

const News = require('../models/news')

function getNews (req, res) {
  let newsId = req.params.newsId

  News.findById(newsId, (err, news) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!news) return res.status(404).send({message: `La noticia no existe`})

    res.status(200).send({ news })
  })
}

function getNewss (req, res) {
  News.find({}, (err, newss) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!newss) return res.status(404).send({message: 'No existen noticias'})

    res.send(200, { newss })
  })
}

function saveNews (req, res) {
  console.log('POST /api/news')
  console.log(req.body)

  let news = new News()
  news.imagen = req.body.imagen
  news.texto = req.body.texto

  news.save((err, newsStored) => {
    if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err} `})

    res.status(200).send({ news: newsStored })
  })
}

function updateNews (req, res) {
  let newsId = req.params.newsId
  let update = req.body

  News.findByIdAndUpdate(newsId, update, (err, newsUpdated) => {
    if (err) res.status(500).send({message: `Error al actualizar la noticia: ${err}`})

    res.status(200).send({ news: newsUpdated })
  })
}

function deleteNews (req, res) {
  let newsId = req.params.newsId

  News.findById(newsId, (err, news) => {
    if (err) res.status(500).send({message: `Error al borrar la noticia: ${err}`})

    news.remove(err => {
      if (err) res.status(500).send({message: `Error al borrar la Noticia: ${err}`})
      res.status(200).send({message: 'La noticia ha sido eliminado'})
    })
  })
}

module.exports = {
  getNews,
  getNewss,
  saveNews,
  updateNews,
  deleteNews
}
