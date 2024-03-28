const express= require('express');
const router= express.Router();
const users= require('./users');

router.use('/users', users);

router.route('/').get(function(req, res){
    res.send('<h1>Hello World!</h1>');
})

router.route('/users').get(function(req, res){
    res.send('<h1>Users Route</h1>')
})

module.exports= router;