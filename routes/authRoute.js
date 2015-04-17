"use strict";
var User = require('../models/User'),
	jwt = require('jsonwebtoken'),
	
	configRoute;

configRoute = function (app){
	app.post('/signin', function(req, res) {
	    User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
	        if (err) {
	            res.json({
	                type: false,
	                data: "Error occured: " + err
	            });
	        } else {
	            if (user) {
	               res.json({
	                    type: true,
	                    data: user,
	                }); 
	            } else {
	                res.json({
	                    type: false,
	                    data: "Incorrect email/password"
	                });    
	            }
	        }
	    });
	});

	app.post('/signup', function(req, res) {
	    User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
	        if (err) {
	            res.json({
	                type: false,
	                data: "Error occured: " + err
	            });
	        } else {
	            if (user) {
	                res.json({
	                    type: false,
	                    data: "User already exists!"
	                });
	            } else {
	                var userModel = new User();
	                userModel.email = req.body.email;
	                userModel.password = req.body.password;
	                userModel.save(function(err, user) {
	                    user.token = jwt.sign(user, 'secret1');
	                    user.save(function(err, user1) {
	                        res.json({
	                            type: true,
	                            data: user1
	                        });
	                    });
	                })
	            }
	        }
	    });
	});

	app.get('/test', ensureAuthorized, function(req, res) {
	    User.findOne({token: req.token}, function(err, user) {
	        if (err) {
	            res.json({
	                type: false,
	                data: "Error occured: " + err
	            });
	        } else {
	            res.json({
	                type: true,
	                data: user
	            });
	        }
	    });
	});

	function ensureAuthorized(req, res, next) {
	    var bearerToken;
	    var bearerHeader = req.headers["authorization"];
	    if (typeof bearerHeader !== 'undefined') {
	        var bearer = bearerHeader.split(" ");
	        bearerToken = bearer[1];
	        req.token = bearerToken;
	        next();
	    } else {
	        res.send(403);
	    }
	}
}

module.exports = {
	configRoute : configRoute
}