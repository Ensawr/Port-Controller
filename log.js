const fs = require('fs');

function logIt(req, res){

    fs.appendFile("./log.txt", req +"\n", function (err,data){

        if(err) throw err;
    });

};

module.exports = logIt;