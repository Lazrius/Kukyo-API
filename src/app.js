import express from 'express'; // Import Express
import fs from 'fs'; // Import File System from Node.JS
import path from 'path'; // Import Path from Node.JS
import favicon from 'serve-favicon'; // Lets have a custom icon
import bodyParser from 'body-parser';
import Promise from 'bluebird';

import { getImages } from "./functions.js";
import activeEndpoints from "./activeEndpoints.js";

let port = process.env.port || 7000 ;// Allow custom port number to be specified in the command line, but default to port 7000 if not.
let src = process.env.src || `img/`; // Allow custom img dir names, but default to a folder called /img/

let app = express(); // Init
app.use(favicon(__dirname + '/public/img/favicon.ico')) // The icon for the website

app.use(express.static(path.join(__dirname, '/public'))); // Where we load out static assets from

// Home Route
app.get('/', (req, res) => {
    res.send("Chicken")
})

// API Route - Here you should list all the endpoints
app.get('/api/', (req, res) => {
    res.send("hu")
})

// Endpoint for cats
app.get('/api/cat/', (req, res) => {
    if(activeEndpoints.cats != 1) 
    {
        // If we don't have the route listed in the activeEndpoints.js file - display this message.
        return res.send(JSON.stringify({ error: { "API ERROR": "ENDPOINT NOT ACTIVE IN CONFIG FILE" } }, null, 3));
    }
    let type = src + 'cats/'; // Directory name
    getImages(__dirname + '/public/' + type, req, type) // Get all the images from the specified directory
    .then(r => { // We get an array of those images
        res.header("Content-Type", "application/json") // Set our header to JSON
        res.send(JSON.stringify({cat: r[Math.floor(Math.random()*r.length)]}, null, 3)); // Pick an image at random and send it to the client
    })
    .catch((e) => res.send(JSON.stringify({ error: [ e ] }, null, 3))); // If there is a error, send it.
})

app.listen(port, () => console.log(`API active and listening on port ${port}`));
