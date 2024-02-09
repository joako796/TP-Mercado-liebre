const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'));

app.get ('/base', function(req, res) {
    res.send ("base");
})

app.get ('/', function(req, res) {
    res.sendFile(path.join (__dirname, './views/home.html'))
})

app.get ('/registro', function(req, res) {
    res.sendFile(path.join (__dirname, './views/registro.html'))
})

app.get ('/login', function(req, res) {
    res.sendFile(path.join (__dirname, './views/login.html'))
})

app.listen (3000, function (req, res) {
    console.log('mercadoliebre');
});