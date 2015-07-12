/// <reference path="../typings/tsd.d.ts"/>

var express = require('express');
var router = express.Router();

//custom router handler
router.use(function (req, res, next) {
    if (req.method === "GET") {
        //all continue to next middleware or request handler
        return next();
    }

    if (!req.isAuthenticated()) {
        //user not authenticated, redirect to login page
        return res.redirect('/#login');
    }

    //authenticated only continue to next middleware or request handler
    return next();
});

router.route('/posts')

//TODO create a new post in the database
    .post(function (req, res) {
        res.send({ message: "TODO create a new post in the database" });
    })

//TODO get all the posts in the database
    .get(function (req, res) {
        res.send({ message: "TODO get all the posts in the database" });
    })

//api for a specfic post
router.route('/posts/:id')

//update
    .put(function (req, res) {
        return res.send({ message: 'TODO modify an existing post by using param ' + req.params.id });
    })

//retrieve
    .get(function (req, res) {
        return res.send({ message: 'TODO get an existing post by using param ' + req.params.id });
    })

//delete
    .delete(function (req, res) {
        return res.send({ message: 'TODO delete an existing post by using param ' + req.params.id })
    })

module.exports = router;