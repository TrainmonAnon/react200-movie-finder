require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const axios = require('axios');

const app = express();

var movieSearches = new Map();
var movies = new Map();

app.use(morgan('dev'));
app.use(express.static('dist'));
app.use(express.static('public'));

app.get('/search/', (req, res) => {
    let search = req.query.s;
    let movie = req.query.i;
    if (search){
        if (movieSearches.has(search)){
            res.send(movieSearches.get(search));
        } else {
            axios.get(`http://www.omdbapi.com/?s=${search}&type=movie&apikey=8730e0e`)
                .then((response) => {
                    res.send(response.data);
                    movieSearches.set(search, response.data);
                })
                .catch(err => console.log(err));
        }
    } else if (movie) {
        if (movies.has(movie)){
            res.send(movies.get(movie));
        } else {
            axios.get(`http://www.omdbapi.com/?i=${movie}&apikey=8730e0e`)
                .then((response) => {
                    res.send(response.data);
                    movies.set(movie, response.data);
                })
                .catch(err => console.log(err));
        }
    }
});

module.exports = app;
