/**
 * Module Dependencies
 */
let api, debug, express, http, path, routes;

api = require('./routes/api');
debug = require('debug');
express = require('express');
http = require('http');
path = require('path');
routes = require('./routes');

let app = express();

/**
 * All Environments
 */

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

const env = process.env.NODE_ENV || 'development';

/**
 * Development Environment
 */

if (env == 'development') {
  // TODO
}

/**
 * Production Environment
 */

if (env == 'production') {
  // TODO
}

/**
 * Routes
 */

app.use('/', routes);

/**
 * Initialize the Server
 */
http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
