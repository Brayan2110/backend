'use strict'

const User = require('../models/user')
const service = require('../services')

const signUp = (req, res) => {
  const user = new User({
    email: req.body.email,
    apellidos: req.body.apellidos,
    telefono: req.body.telefono,
    edad: req.body.edad,
    ubicacion: req.body.ubicacion,
    password: req.body.password
  })

  user.save(err => {
    if (err) return res.status(500).send({ msg: `Error al crear usuario: ${err}` })
    return res.status(200).send({ token: service.createToken(user) })
  })
}

const usuarios = (req, res) =>{
  User.find({}, (err, users) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!users) return res.status(404).send({message: 'No existen usuarios'})

    res.send(200, { users })
  })
}

const signIn = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send({ msg: `Error al ingresar: ${err}` })
    if (!user) return res.status(404).send({ msg: `no existe el usuario: ${req.body.email}` })

    return user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) return res.status(500).send({ msg: `Error al ingresar: ${err}` })
      if (!isMatch) return res.status(404).send({ msg: `Error de contraseña: ${req.body.email}` })

      req.user = user
      return res.status(200).send({ msg: 'Te has logueado correctamente', token: service.createToken(user) })
    });

  }).select('_id email +password');
}

module.exports = {
  signUp,
  signIn,
  usuarios
}
