const { exec } = require('child_process');
const fs = require('fs');
let time = 0

function readFiles(dirname, onFileContent) {
    fs.readdir(dirname, function (err, filenames) {
        if (err) {
            console.log('error a', err)
            return;
        }
        filenames.forEach(function (filename) {
            setTimeout(() => {
                console.log("filename")
                console.log(filename)
                compress(filename)
            }, time)
            time = time + 250
            // fs.readFile(dirname + filename, 'utf-8', function (err, content) {
            //     if (err) {
            //         console.log('error b', err)
            //         return;
            //     }
            //     onFileContent(filename, content);
            // });
        });
    });
}

function compress(file) {
    // console.log(file)
    const cmd = `convert -resize 25% /Users/sunil.chaudhary/Downloads/LFTP/Camera/r1/${file} /Users/sunil.chaudhary/Downloads/LFTP/Camera/r2/${file}`
    console.log(cmd)
    exec(cmd)
}

readFiles(__dirname + '/../Camera/r1')