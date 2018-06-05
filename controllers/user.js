'use strict'

const User = require('../models/user')
const service = require('../services')

const signUp = (req, res) => {
  const user = new User({
    nombre: req.body.nombre,
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

const usuario = (req, res) =>{
  User.findOne({_id: req.headers._id}, (err, user) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!user) return res.status(404).send({message: 'No se encontro el usuarios'})

    res.send(200, { user })
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
      return res.status(200).send({ msg: 'Te has logueado correctamente', token: service.createToken(user) , id: user._id})
    });

  }).select('_id email +password');
}

const updateUser = (req, res) => {
  let usertId = req.params.userId
  let update = req.body

  User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
    if (err) res.status(500).send({message: `Error al actualizar el usuario: ${err}`})

    res.status(200).send({ user: userUpdated })
  })
}

module.exports = {
  signUp,
  signIn,
  usuarios,
  updateUser,
  usuario
}
