import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { fetchMovie } from '../actions/movieActions';

class MovieDetailContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            goBack:false,
        };
        
        this.props.fetchMovie(this.props.match.params.id);
    }

    onClick(){
        this.setState({
            goBack:true,
        })
    }

    render() {
        if (this.state.goBack) return <Redirect to='/' />
        return (
            <div className='row justify-content-center'>
                <button onClick={() => this.onClick()}>Go back</button>

                <img id='poster' className='col-3' src={this.props.movie.Poster} />
                
                <div className='col-6 card'>
                    <div className='card-header'>Movie Details</div>
                    <div className='card-body'>
                        <p>{this.props.movie.Title}</p>
                        <p>{`Released ${this.props.movie.Year}`}</p>
                        <p>{this.props.movie.Plot}</p>
                        <p>{this.props.movie.Awards}</p>
                        <p>{`Metascore: ${this.props.movie.Metascore}/100`}</p>
                        <p>{`IMDB: ${this.props.movie.imdbRating}`}</p>
                    </div>
                </div>
            </div>
        )
    }
}
MovieDetailContainer.propTypes = {
    fetchMovie: PropTypes.func.isRequired,
    search: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    movie: state.movies.item,
});

export default connect(mapStateToProps, { fetchMovie })(MovieDetailContainer);
