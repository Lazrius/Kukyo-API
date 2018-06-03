// Keep our main file clean, list all our functions here - it shouldn't be that many.
import fs from 'fs'; // Import file system
import path from 'path'; // Import path
import Promise from 'bluebird';

let extensions = [".png", ".gif", ".jpg", ".jpeg"]

export function getImages(src, req, type) { // Pass in img dir and our request
    return new Promise((resolve, reject) => { // We want to handle our responce async
        let files = fs.readdirSync(src); // Get all files in directory
        if(files.length <= 0) return console.log("No files found."); // If no files found return and log it

        let pictures = []; // New empty array
        files.forEach((file) => { // Loop over files
            if(extensions.indexOf(path.extname(src + file).toLowerCase()) !== -1) { // If the extention matches the ones in our array
                let url = req.protocol + '://' + req.get('host') +'/' + type;
                pictures.push(path.join(url + file)) // Add it to the array
            }
        });

        if(pictures.length <= 0) { // If we had files, but they were not images
            console.log("No pictures found in " + src) // Log it
            pictures = undefined; // Make sure we are not defined
            resolve(pictures)
        }
    
        if(pictures == []) {
            console.log("Err, invalid folder structure")
            resolve(pictures = undefined);
        }

        resolve(pictures) // Return the array
    })
}