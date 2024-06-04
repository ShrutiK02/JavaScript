var http = require('http');
var url = require('url')

function zeroFill(i) {
  return (i < 10 ? '0' : '') + i
}

function currenttime(d) {    
  return {
    year: d.getFullYear(),
    month: zeroFill(d.getMonth() + 1),
    date: zeroFill(d.getDate()),
    hour: zeroFill(d.getHours()),
    minute: zeroFill(d.getMinutes())
};
} 

// Create an instance of the http server to handle HTTP requests 
let server = http.createServer((req, res) => { 

    var parsedUrl = url.parse(req.url, true)
    let d = parsedUrl.query.iso ? new Date(parsedUrl.query.iso): new Date()
    var result

    if(/^\/api\/currenttime/.test(req.url)){
        result = currenttime(d)
    }

    if (result){
        // Set a response type of json for the response 
        res.writeHead(200, {'Content-Type': 'application/json'});
        // Send back a response and end the connection
        res.end(JSON.stringify(result)+'\n');
    }
   else{
        res.writeHead(404)
        res.end()
    }
});

const PORT = 8000
server.listen(8000)
console.log('Node server running on http://localhost:8000');
