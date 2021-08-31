require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const admin = require('./admin/index.js');
const PORT = process.env.ADMIN_PORT || 3500;

app.set('views', __dirname + '/admin/views');
app.set('view engine', 'twig');
app.set('twig options', { 
    strict_variables: false
});

app.use('/simplemde', express.static(__dirname + '/../node_modules/simplemde/dist/'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 

app.use(admin);

app.listen(PORT, () => { console.log(`Admin is running at port ${PORT}`) });