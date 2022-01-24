const http = require('http');
const myLog = require('./log');
var portUsed = require('port-used');
const nodemailer = require('nodemailer');

const server = http.createServer((req, res) => {

    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'}); 
    res.write('Server is running.');
    res.end();

});

// This function for starting server.

function run_file(){
    const process = require('child_process');
    var ls = process.spawn('start.bat');
    ls.stdout.on('data', function (data) {
        console.log(data);
    });
    ls.stderr.on('data', function (data) {
        console.log(data);
    });
    ls.on('close', function (code) {
        if(code == 0){
          console.log("Server was down on "+date);
        }
        else
          console.log('Start');
    });
}

// Mail configs.

let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
        user: 'changethismail@gmail.com',
        pass: 'password'
    }
});

// For mail verify.

transporter.verify(function (error, success) {
    if (error) throw error;
    console.log('Connection success.');
});

// Mail contents.

let data = {
    from: 'Mail Test <changethismail@gmail.com>',
    to: 'targetmail@gmail.com',
    subject: 'You have a message from portcontroller',
    text: 'Your port is not running now. Check it.'
  };

// Checking server status every minute.

server.listen(9999, () => {
    var minutes = 1, the_interval = minutes * 60 * 1000;
    setInterval(function() {
        let date = new Date();
        portUsed.waitForStatus({
            port: 6060,
            host: 'localhost',
            inUse: true,
        }).then(() => {
            myLog('Port is running. Checking date: '+date)
        }, (err) => {
            myLog('Port is not running. Checking date: '+date)
            transporter.sendMail(data, function (error, info) {
                if (error) throw error;
                console.log('E-mail sent');
            });
            run_file()
        });
    }, the_interval);
});