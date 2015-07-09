/// <reference path="../typings/tsd.d.ts"/>

var express = require('express');
var router = express.Router();

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

//create
    .put(function (req, res) {
        return res.send({ message: 'TODO modify an existing post by using param ' + req.params.id });
    })

    .get(function (req, res) {
        return res.send({ message: 'TODO get an existing post by using param ' + req.params.id });
    })

    .delete(function (req, res) {
        return res.send({ message: 'TODO delete an existing post by using param ' + req.params.id })
    })

module.exports = router;