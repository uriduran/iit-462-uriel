var express = require('express');

var bodyParser = require('body-parser');

var app = express();

const http = require('http');
http.createServer(function (req, res) {
  console.log(`${req.method} ${req.url}`);
  res.end('hello world!');
}).listen(3000);
console.log('Server listening on port 3000');