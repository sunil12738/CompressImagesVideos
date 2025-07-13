const { exec, execSync } = require('child_process');
const fs = require('fs');
let time = 0
const entryDirectoryName = '/FromVideo';
const outputDirectoryName = '/ToVideo';

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
            time = time + 5000
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
    const input = `${__dirname}${entryDirectoryName}/${file}`
    const output = `${__dirname}${outputDirectoryName}/${file}`
    const cmd = `ffmpeg -i ${input} -vf "scale=iw/2:ih/2" ${output}`
    console.log(cmd)
    const response = execSync(cmd)
    const { atimeMs, mtimeMs, ctimeMs, birthtimeMs } = fs.statSync(input)
    console.log({ atimeMs, mtimeMs, ctimeMs, birthtimeMs })
    fs.utimesSync( output, new Date(birthtimeMs), new Date(birthtimeMs) )
}

readFiles(__dirname + entryDirectoryName)
