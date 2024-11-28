var http = require('http')

var server = http.createServer();

function mensaje(petic, resp) {
    resp.writeHead(200, {'Content-Type': 'text/plain'});
    resp.write('Hola Mundo')
    resp.end
}

function comandos(petic, resp) {
    resp.writeHead(200, {'Content-Type': 'text/plain'});
    resp.write('<p>Hola Mundo 2</p>')
    resp.end
}

server.on ('request', comandos);

server.listen(3000, function() {
    console.log('Servidor escuchando en el puerto 3000');
});