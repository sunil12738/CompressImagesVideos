const { exec, execSync } = require('child_process');
const fs = require('fs');
let time = 0
const entryDirectoryName = '/FromMov';
const outputDirectoryName = '/ToMp4';

function readFiles(dirname, onFileContent) {
    fs.readdir(dirname, function (err, filenames) {
        if (err) {
            console.log('error a', err)
            return;
        }
        filenames.forEach(function (filename) {
            // setTimeout(() => {
                console.log("filename: ", filename)
                // console.log(filename)
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
    if (file.split(".")[1].toLowerCase() === 'heic') {
        console.log("----", file)
    }
    const input = `.${entryDirectoryName}/${file}`
    const output = `.${outputDirectoryName}/${file.split(".")[0]}.mp4`
    // const cmd = `convert -resize 50% /Users/sunil.chaudhary/Temporary/CompressImagesVideos/${entryDirectoryName}/${file} /Users/sunil.chaudhary/Temporary/CompressImagesVideos/${outputDirectoryName}/${file}`
    const cmd = `ffmpeg -i ${input} -qscale 0 ${output}`
    const response = execSync(cmd)
    const { atimeMs, mtimeMs, ctimeMs, birthtimeMs } = fs.statSync(input)
    console.log({ atimeMs, mtimeMs, ctimeMs, birthtimeMs, cmd })
    fs.utimesSync( output, new Date(birthtimeMs), new Date(birthtimeMs) )

}

readFiles(__dirname + `${entryDirectoryName}`)
