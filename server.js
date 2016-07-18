var express = require('express');
//import express from 'express' //es2015
var app = express();

app.set('view engine', 'pug');
app.use(express.static('public'));//indicarle al server que se sirva el directorio

app.get('/', function(req, res) {
  res.render('index', { title: 'Fakegram' });
})

app.get('/signup', function(req, res) {
  res.render('index', { title: 'Fakegram - signup'  });
})

app.get('/signin', function(req, res) {
  res.render('index', { title: 'Fakegram - signin'  });
})

app.get('/api/pictures', function (req, res, next) {
  
var pictures = [
      {
            user: {
                  username: 'emma99',
                  avatar: 'https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-9/13511055_10207912026893391_6311686932057139332_n.jpg?oh=b50dd20c1980f67e126d15703cd40991&oe=581FE66E'
            },
            url: 'office.jpg',
            likes: 0,
            liked: true,
            createdAt: new Date().getTime()
      },
      {
            user: {
                  username: 'perrim',
                  avatar: 'https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-9/13511055_10207912026893391_6311686932057139332_n.jpg?oh=b50dd20c1980f67e126d15703cd40991&oe=581FE66E'
            },
            url: 'office.jpg',
            likes: 2,
            liked: true,
            createdAt: new Date().setDate(new Date().getDate() - 10)
            
      }
];
setTimeout(function(params) {
  res.send(pictures);
}, 2000);//simular el cargado de la BD

})

app.listen(3000, function(err) {
  if (err) return console.log('Hubo un error'), process.exit(1);

  console.log('escuchando en el puerto 3000');
})
