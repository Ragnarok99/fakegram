var page = require('page');
var moment = require('moment');

moment.locale('es');

require('moment/locale/es');
require('./homepage');
require('./signup');
require('./signin');


page();