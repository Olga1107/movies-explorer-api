const moviesRout = require('express').Router();
const { validationCreateMovie, validationMovieId } = require('../middlewares/validations');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

moviesRout.get('/', getMovies);
moviesRout.post('/', validationCreateMovie, createMovie);
moviesRout.delete('/:movieId', validationMovieId, deleteMovie);

module.exports = moviesRout;
