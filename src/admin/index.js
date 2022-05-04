const express = require('express');
const route = express.Router();

const postController = require('./post')

route.get('/', (req, res) => {
    res.render('index', {
        name: "Sang"
    });
});

route.use('/posts', postController);

module.exports = route;