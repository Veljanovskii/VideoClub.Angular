import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MovieState } from './movie.reducer';

const getMovieFeatureState = createFeatureSelector<MovieState>('movies');

export const getMovies = createSelector(
  getMovieFeatureState,
  state => state.movies
);

export const getMovieError = createSelector(
  getMovieFeatureState,
  state => state.error
);
