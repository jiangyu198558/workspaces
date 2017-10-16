// Generated by CoffeeScript 1.12.7
(function() {
  var app, config, http, onError, onListening, port, server;

  app = require('./libs/app');

  config = require('./config/config');

  http = require('http');

  port = config.port;

  server = http.createServer(app);

  onError = function(error) {
    var bind, ref;
    if (error.syscall !== 'listen') {
      throw error;
    }
    bind = (ref = typeof port === 'string') != null ? ref : 'Pipe ' + {
      port: 'Port ' + port
    };
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        return process.exit(1);
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        return process.exit(1);
      default:
        throw error;
    }
  };

  onListening = function() {
    var addr, bind, ref;
    addr = address();
    bind = (ref = typeof addr === 'string') != null ? ref : 'pipe ' + {
      addr: 'port ' + addr.port
    };
    return debug('Listening on ' + bind);
  };

  server.on('error', onError);

  server.listen(port, function() {
    return console.log('Started...', port);
  });

}).call(this);
