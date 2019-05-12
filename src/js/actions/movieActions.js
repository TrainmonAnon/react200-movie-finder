import { FETCH_MOVIES, FETCH_MOVIE } from '../actions/types';

const axios = require('axios');

export const fetchMovies = (query) => {
    return (dispatch) =>
        axios.get(`/search/`, {params:{s:query.search}})
            .then(res => res.data.Search)
            .then(movies => 
                Promise.all(movies.map(movie => 
                    axios.get(`/search/`, {params:{i:movie.imdbID}})
                        .then(response => response.data)
                )).then( movieData =>
                    dispatch({
                        type: FETCH_MOVIES,
                        payload: movieData
                    })
                )
            )
}
export const fetchMovie = id => {
    return (dispatch) =>
        axios.get(`/search/`, {params:{i:id}})
            .then(res => res.data)
            .then(movie => dispatch({
                type: FETCH_MOVIE,
                payload: movie
            }));
}