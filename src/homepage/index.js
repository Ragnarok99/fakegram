
var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var request = require('superagent');
var header = require('../header');
var webcam = require('webcamjs');
var picture = require ('../picture-card');


page('/', header, loadPictures, function (ctx, next) {//se ejecutan nla funciones en cadena una tras otra, header hace el appern del heade, y loadPictures carga los datos haciendo la peticion a la api
title('Fakegram');
var main = document.getElementById('main-container');

empty(main).appendChild(template(ctx.pictures));//ya obtenemos las pictures con ctx

const picturePreview = $('#picture-preview');
const camaraInput = $('#camara-input');
const cancelPicture = $('#cancelPicture');
const shootButton = $('#shoot');
const uploadButton = $('#uploadButton');

function reset(){
      picturePreview.addClass('hide');
      cancelPicture.addClass('hide');
      uploadButton.addClass('hide');
      shootButton.removeClass('hide');
      camaraInput.removeClass('hide');
}

cancelPicture.click(reset);

      $('.modal-trigger').leanModal({
            ready: function(){//cuando se dispare el modal
                  webcam.attach("#camara-input");
                  shootButton.click((ev) =>{
                        webcam.snap((data_uri)=>{
                              picturePreview.html(`<img src="${data_uri}"/>`);
                              picturePreview.removeClass('hide');
                              cancelPicture.removeClass('hide');
                              uploadButton.removeClass('hide');
                              shootButton.addClass('hide');
                              camaraInput.addClass('hide');
	                        uploadButton.off('click');
                              uploadButton.click(()=>{
                                    const pic = {
                                          url: data_uri,
                                          likes: 0,
                                          liked: false,
                                          createdAt: +new Date().getDate(),
                                          user:{
                                                username: 'emma99',
                                                avatar: 'https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-9/13511055_10207912026893391_6311686932057139332_n.jpg?oh=b50dd20c1980f67e126d15703cd40991&oe=581FE66E'
                                          }
                                    }
                                    $('#picture-cards').prepend(picture(pic));
                                    reset();
                                    $('#modalCamara').closeModal();
                              })    
                          })
                  })
            },
            complete: function(){//cuando acabe
                  webcam.reset();
                  reset();
            }
      });
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


