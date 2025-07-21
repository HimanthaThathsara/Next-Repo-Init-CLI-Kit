#!/usr/bin/env node

// This script writes an HTML5 template to a specified file.

// importing the FS modules
const fs = require("fs");

function writeHTML5() {
    // Get the HTML5 template from the index.html file.
    const html5 = fs.readFileSync(`${__dirname}/index.html`)

    // filename is provided as a command line argument.
    const filename = process.argv[2]
    // test the filename.
    // console.log(`Writing HTML5 to ${filename}`);

    // Get the current working directory and write the HTML5 template to the specified file.
    fs.writeFileSync(`${process.cwd()}/${filename}`, html5)

}

writeHTML5();