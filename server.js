var express = require('express');
//import express from 'express' //es2015
var app = express();

app.set('view engine', 'pug');
app.use(express.static('public'));//indicarle al server que se sirva el directorio

app.get('/', function(req, res) {
  res.render('index', {  })
})

app.get('/signup', function(req, res) {
  res.render('index', {  })
})

app.get('/signin', function(req, res) {
  res.render('index', {  })
})

app.listen(3000, function(err) {
  if (err) return console.log('Hubo un error'), process.exit(1);

  console.log('escuchando en el puerto 3000');
})
