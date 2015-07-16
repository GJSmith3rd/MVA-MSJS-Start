/// <reference path="../typings/tsd.d.ts"/>
//create mongodb mongoose models and schemas

var mongoose = require('mongoose');

//create mongoose userSchema
var userSchema = new mongoose.Schema({
    username: String,
    password: String, //hash created from password
    created_at: {type: Date, default: Date.now}
});

//create mongoose postSchema
var postSchema = new mongoose.Schema({
    text: String,
    username: String,
    created_at: {type: Date, default: Date.now}
});

//synthesize mongoose models to mongoose schemas

//declare a model called User which has schema userSchema
mongoose.model('User', userSchema);
//declare a model called Post which has schema postSchema
mongoose.model('Post', postSchema);