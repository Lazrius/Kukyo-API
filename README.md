# Kukyo-API
Simple JSON REST API for fetching randomised images

## What is it?
This is a simple API that allows you to serve randomised images from a folder to the user. Once active it will pick a file at random from the specified directory and link an image from it.

## Usage
It should be run like any other Node application. Clone it to a folder on your drive and run `npm install`. When you want to run it, simply use `node app` while in the folder. You can provide to optional parameters to it. These are `port` and `src`.

By default `port` is given a value of `7000` and `src` is given a value of `img/`. img/ refers to the directory in which all images are stored, if you want to give it a different name, specify here.
(Example)

``env port=7001 node app``
``env src=pic/ node app``

You can add your own custom routes by copying the default cat route and changing the type variable, along with the route location. By editing the type it will also search a folder of the same name - so you'll have to make sure the name provided is "folder-friendly". 
(Example)
````js
app.get('/api/foxes/', (req, res) => {

  if(activeEndpoints.foxes  ==  0) return  res.send(JSON.stringify({ error: { "API ERROR":  "ENDPOINT NOT ACTIVE IN CONFIG FILE" } }, null, 3));
    let  type  =  src  +  'foxes/';
    getImages(__dirname  +  '/public/'  +  type, req, type)
      .then(r  => {
        res.header("Content-Type", "application/json")
        res.send(JSON.stringify({fox:  r[Math.floor(Math.random()*r.length)]}, null, 3));
      })
      .catch((e) =>  res.send(JSON.stringify({ error: [ e ] }, null, 3)));
})
````

I would also suggest adding some validation into the `activeEndpoints.js` file. This file allows endpoints to be simply disabled without having to edit the rest of the code.

## Accessing the API
Currently, you can just send get requests like you would with any other system. Just boot up the API and send it a request to get a response. In the near future, I'll be creating an NPM project to make this easier to do.
