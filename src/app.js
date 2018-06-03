import express from 'express'; // Import Express
import fs from 'fs'; // Import File System from Node.JS
import path from 'path'; // Import Path from Node.JS
import favicon from 'serve-favicon'; // Lets have a custom icon
import stylus from 'stylus'; // Stylus for easy CSS writing
import nib from 'nib'; // Extend Stylus
import bodyParser from 'body-parser';
import Promise from 'bluebird';

import { getImages } from "./functions.js";
import activeEndpoints from "./activeEndpoints.js";

let port = process.env.port || 7000 ;// Allow custom port number to be specified in the command line, but default to port 7000 if not.
let src = process.env.src || `img/`; // Allow custom img dir names, but default to a folder called /img/

let app = express(); // Init
app.set('view engine', 'pug');
app.use(favicon(__dirname + '/public/img/favicon.ico'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

function compile(str, path) {
    return stylus(str)
      .set('filename', path)
      .use(nib())
  }

app.use(stylus.middleware(
    {
        src: path.join(__dirname + '/public'),
        compile: compile
    }
));

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
    res.send("Chicken")
})

app.get('/api/', (req, res) => {
    res.send("hu")
})

app.get('/api/cat/', (req, res) => {
    if(activeEndpoints.cats == 0) return res.send(JSON.stringify({ error: { "API ERROR": "ENDPOINT NOT ACTIVE IN CONFIG FILE" } }, null, 3));
    let type = src + 'cats/';
    getImages(__dirname + '/public/' + type, req, type)
    .then(r => {
        res.header("Content-Type", "application/json")
        res.send(JSON.stringify({cat: r[Math.floor(Math.random()*r.length)]}, null, 3));
    })
    .catch((e) => res.send(JSON.stringify({ error: [ e ] }, null, 3)));
})

app.listen(port, () => console.log(`API active and listening on port ${port}`));