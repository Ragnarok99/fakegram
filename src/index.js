var page = require('page');


var main = document.getElementById('main-container');

page('/', function (ctx, next) {
    main.innerHTML = 'Home3';
})

page('/signup', function (ctx, next) {
    main.innerHTML = 'signup';
})

page();