const express = require('express');
const cors = require('cors');
const fs = require('fs');
const Fuse = require('fuse.js');

const {promisify} = require('util');

const readFileAsync = promisify(fs.readFile);

const app = express();
const PORT = process.env.PORT || 8080;
const path = require('path');

app.use(cors());

let movies = [];

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist/searchMovies'));
    app.get('/api', (req, res) => {
        let result;
        let response = res;
        readFileAsync(path.resolve(__dirname,'b.json'),'utf8')
            .then((res) => {
                movies = JSON.parse(res);
                const options = {
                    keys: ['MovieName'],
                    shouldSort: true,
                    threshold: 0.4
                };

                const fuse = new Fuse(movies, options);
                result = fuse.search(req.query.term).slice(0, 10);
                response.send({resp: result});
            })
            .catch((err) => {
                response.send({error: "There was an error."})
            });
    });
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'dist', 'searchMovies', 'index.html'));
    });
}

app.listen(PORT);
