const express = require('express')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()

app.listen(3005)

app.use(express.static('archivos'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/archivos/formulario.html')
})

app.get('/collage', (req, res) => {
  res.sendFile(__dirname + '/archivos/Collage.html');
});

app.use(fileUpload({
  limits: {fileSize: 5000000}, 
  abortOnLimit: true,
  responseOnLimit: "Archivo sobrepasa el máximo permitido"
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/imagen', (req, res) => {
  const { target_file } = req.files
  const { posicion } = req.body
  target_file.mv(`${__dirname}/archivos/imgs/imagen-${posicion}.jpg`, (err) => {
    if (err) throw err
    res.redirect('/collage')
  })
})
app.get('/deleteImg/:nombre', (req, res) => {
  let nombre = req.params.nombre
  fs.unlink(`archivos/imgs/${nombre}`, (err) => {
    if (err) throw err;
    res.send(`Foto ${nombre} ah sido borada`)
  })
})