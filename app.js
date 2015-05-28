'use strict';

var express = require('express'),
app         = express();
process.env.PWD = process.cwd();

app.use(express.static(process.env.PWD + '/'));

app.get('/', function(req, res) {
  res.redirect('/public/html/index.html');
});

app.listen(process.env.PORT || 3000);
