import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMovies } from '../actions/movieActions';
import { Redirect } from 'react-router';

class MovieSearchContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchName:'',
            toMovie: undefined,
        };
    }

    onChange(e){
        this.setState({
            searchName: e.target.value,
        });
    }

    onSubmit(){
        console.log('Starting search...')
        const query = {
            search: this.state.searchName,
        };
      
        this.props.fetchMovies(query);
    }

    setMovie(e){
        let movie = e.target.value;
        this.setState({
            toMovie:movie,
        });
    }

    render() {
        if (this.state.toMovie){
            return <Redirect to={`/movie/${this.state.toMovie}`} />
        }

        const searchItems = this.props.search.map(movie => (
            <div className='card'>
                <div className='row card-body'>
                    <div className='col-2'>
                        <img className='img-fluid' src={movie.Poster} />
                    </div>
                    <div className='col'>
                        <h4>{movie.Title}</h4>
                        <h5>{movie.Year}</h5>
                        <hr/>
                        <p>{movie.Plot}</p>
                        <div className='text-right'>
                            <button className='movieSelect' value={movie.imdbID} onClick={(e) => this.setMovie(e)}>More Information</button>
                        </div>
                    </div>
                </div>
            </div>
        ));
        return (
            <div className='container'>
                <div id='searchBar' className='input-group'>
                    <input id='searchInput' type='text' className='form-control' onChange={(e) => this.onChange(e)} />
                    <div className='input-group-append'>
                        <button id='searchButton' className='input-group-text' onClick={() => this.onSubmit()}>Go!</button>
                    </div>
                </div>

                <div id='searchItems'>
                    {searchItems}
                </div>
            </div>
        );
    }
}
MovieSearchContainer.propTypes = {
    fetchMovies: PropTypes.func.isRequired,
    search: PropTypes.array,
};

const mapStateToProps = state => ({
    search: state.movies.items,
});

export default connect(mapStateToProps, { fetchMovies })(MovieSearchContainer);
