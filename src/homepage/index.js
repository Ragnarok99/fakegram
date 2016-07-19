
var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var request = require('superagent');
var header = require('../header');

page('/', header, loadPictures, function (ctx, next) {//se ejecutan nla funciones en cadena una tras otra, header hace el appern del heade, y loadPictures carga los datos haciendo la peticion a la api
title('Fakegram');
var main = document.getElementById('main-container');

      empty(main).appendChild(template(ctx.pictures));//ya obtenemos las pictures con ctx

})

function loadPictures(ctx, next) {
      request
            .get('/api/pictures')//pedir datos por super agent
            .end(function (err, res) {//callback con los datos
              if(err) return console.log(err);

              ctx.pictures = res.body;//compartir datos atraves de los middlewares con ctx
              next();//siguiente middleware    
            })
}


