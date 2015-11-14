#!/usr/bin/env node
"use strict";

/*
 *
 *  GET /   index view with submission form, counters, etc.
 *
 *  GET /a000   shortened URLs
 *  GET /a003   Base 36
 *  GET /a011
 *  GET /zzzz   Database lookup, redirect, increment counter
 *
 *  POST /shorten
 *   Payload    URL to shorten (e.g. http://www.google.com/)
 *   Return     Short identifier (e.g. a000)
 *
 *  GET /expand/:short_id
 *   Return     Long URL (e.g. http://www.google.com/)
 *
 *  GET /top/:n
 *   Return     n URLs with the most clicks
 */

var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongodb = require('mongodb');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* From
 * <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random>
 */

// Returns a random integer between min and max
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var uri = process.env.MONGOLAB_URI || "mongodb://localhost:27017/test";

mongodb.MongoClient.connect(uri, function(err, db) {
  if (err) {
    throw err;
  }

  global.counters = db.collection("counters");
  global.urls = db.collection("urls");

  app.use('/', routes);

  app.get('/expand/:short_id', function(req, res) {
  });

  app.get('/top/:n', function(req, res) {
  });

  app.get('/:short_id', function (req, res) {
    var short_id = parseInt(req.params.short_id, 36);

    if (isNaN(short_id)) {
      throw new Error("Not a number");
    }

    urls.findOne(
      { short_id: short_id },
      function(err, result) {
        if (err) {
          throw err;
        }

        if (result === null) {
          return res.render("404");
        }

        console.dir(result);
        res.redirect(result.long_url);
    });

  });

  app.post('/shorten', function(req, res) {
    var long_url = req.body.long_url;

    counters.findAndModify(
      { name: "short_id" },
      [['_id','asc']],
      { $inc: { count: getRandomInt(1, 10)} },
      {},
      function(err, obj) {
        if (err) {
          throw err;
        }

        urls.insert({
          short_id: obj.count,
          long_url: long_url
        }, function(err, result) {
          if (err) {
            throw err;
          }

          console.dir(result);

          res.json({
            short_id: result[0].short_id.toString(36)
          });
        });
      }
    );


  });

  /// catch 404 and forwarding to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  /// error handlers

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });

});

module.exports = app;
