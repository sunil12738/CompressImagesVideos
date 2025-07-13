const { exec, execSync } = require('child_process');
const fs = require('fs');
let time = 0
const entryDirectoryName = '/FromImage';
const outputDirectoryName = '/ToImage';

function readFiles(dirname, onFileContent) {
    fs.readdir(dirname, function (err, filenames) {
        if (err) {
            console.log('error a', err)
            return;
        }
        filenames.forEach(function (filename) {
            // setTimeout(() => {
                console.log("filename: ", filename)
                compress(filename)
            // }, time)
            // time = time + 250
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
    console.log('start', file)
    const input = `${__dirname}${entryDirectoryName}/${file}`
    const output = `${__dirname}${outputDirectoryName}/${file}`
    const cmd = `magick convert -resize 25% ${input} ${output}`
    const cmdResponse = execSync(cmd)
    const { atimeMs, mtimeMs, ctimeMs, birthtimeMs } = fs.statSync(input)
    console.log({ atimeMs, mtimeMs, ctimeMs, birthtimeMs })
    fs.utimesSync( output, new Date(birthtimeMs), new Date(birthtimeMs) )
    console.log('--end--')

}

readFiles(__dirname + `${entryDirectoryName}`)
