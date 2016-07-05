var express = require('express');
//import express from 'express' //es2015
var app = express();

app.get('/', function(req, res) {
  res.send('hola mundo');
})

app.listen(3000, function(err) {
  if (err) return console.log('Hubo un error'), process.exit(1);

  console.log('escuchando en el puerto 3000');
})
