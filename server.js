const http = require('http');

const server = http.createServer((req, res) => {

    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'}); 
    res.write('Server running.');
    res.end();

});

// Test port is 6060. You can change the port for your server.

server.listen(6060, () => {
 console.log("Server is running");
});