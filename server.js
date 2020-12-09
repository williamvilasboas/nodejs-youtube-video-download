const fs = require('fs')
const youtubedl = require('youtube-dl')

const express = require('express');

const app = express();

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.get('/', async function (req, res, next) {
    return res.send(`
    <body>
        <form method="POST" action="/download">
            Cole a URL do video <br>
            <input type="text" name="video">

            <button type="submit">Enviar</button>
        </form>
    </body>
    
    `);
});

app.post('/download', async function (req, res, next) {
    try {
        const { video: name } = req.body;
        const video = youtubedl(name,
      //   ['--format=18', '-f best'],
          [],
        { cwd: __dirname })
       
      // Will be called when the download starts.
      video.on('info', function(info) {
        console.log('Download started')
        console.log('filename: ' + info._filename)
        console.log('size: ' + info.size)
      })
      video.pipe(res);
    } catch (err) {
        console.log(err);
    }
})
app.listen(9008);