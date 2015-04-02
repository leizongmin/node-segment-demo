/**
 * Segment Demo
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var path = require('path');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var Segment = require('segment');


console.log('load segment...')
var segment = new Segment();
segment.useDefault();

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use('/assets', serveStatic(path.resolve(__dirname, 'assets')));

app.get('/', function (req, res, next) {
  res.sendFile(path.resolve('index.html'));
});

app.post('/do_segment', function (req, res, next) {
  var t = Date.now();
  var ret = segment.doSegment(req.body.text || '');
  res.json({text: req.body.text, words: ret, spent: Date.now() - t});
});

app.listen(3011);
console.log('server started');
