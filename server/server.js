

// You may totally change any code in here.
// You may use any libraries you want.


var fs = require('fs');
var http = require('http');


var seed = require('./seed');
var db = require('./fake_db');

var indexFileLocation = './index.html';

http.createServer(function(req, res) {
  if (req.method == 'GET' && req.url == '/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.createReadStream(indexFileLocation).pipe(res);
  }
  if (req.url == '/todos'){

      var jsonString = '';
      req.on('data', function (data) {
          jsonString += data;
      });
      req.on('end', function () {
          switch (req.method){
              case "GET":
                  db.list(10, function(err, list) {
                      res.writeHead(200, {'Content-Type': 'application/json'});
                      res.end(JSON.stringify(list));
                  });
                  break;
              case "PUT":
              case "POST":

                  var data=JSON.parse(jsonString);
                  db.upsert(data, function(err,record){
                      res.writeHead(200, {'Content-Type': 'application/json'});
                      res.end(JSON.stringify(record));
                  });
          break;
              case "DELETE":{
                  var data=JSON.parse(jsonString);
                  var id=data.id;
                  db.destroy(id, function(err,record){
                      res.writeHead(200, {'Content-Type': 'application/json'});
                      res.end(JSON.stringify(record));
                  })
              }
          default:
          break;
      }

      });
  }
    //check to see if they passed in a task to view
    var urlMatches=req.url.match(/todos\/(\d+)/i);
    if (req.method=="GET" &&  urlMatches !== null){
        var id=urlMatches[1];

        db.get(id, function(err,data){
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(data));
        });

    }

}).listen(8000);
                    console.log("Blah")
console.log('Server running at http://127.0.0.1:8000/');
