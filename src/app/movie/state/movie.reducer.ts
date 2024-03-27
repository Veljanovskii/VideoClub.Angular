import { Movie } from '../../models/Movie';
import { createReducer, on } from '@ngrx/store';
import { MovieActions } from './movie.actions';

export interface MovieState {
  movies: Movie[];
  isLoadingResults: boolean;
  resultsLength: number;
  error: string;
}

const initialState: MovieState = {
  movies: [],
  isLoadingResults: false,
  resultsLength: 0,
  error: '',
};

export const movieReducer = createReducer<MovieState>(
  initialState,
  on(MovieActions.loadMovies, (state): MovieState => {
    return {
      ...state,
      isLoadingResults: true
    };
  }),
  on(MovieActions.loadMoviesSuccess, (state, action): MovieState => {
    return {
      ...state,
      movies: action.movies,
      isLoadingResults: false,
      resultsLength: action.movies.length
    };
  }),
  on(MovieActions.loadMoviesFailure, (state, action): MovieState => {
    return {
      ...state,
      error: action.error,
      isLoadingResults: false
    };
  }),

  on(MovieActions.addMovieSuccess, (state, action): MovieState => {
    return {
      ...state,
      movies: [...state.movies, action.movie],
      error: '',
    };
  }),
  on(MovieActions.addMovieFailure, (state, action): MovieState => {
    return {
      ...state,
      error: action.error,
    };
  }),

  on(MovieActions.editMovieSuccess, (state, action): MovieState => {
    const updatedMovies = state.movies.map((movie) =>
      movie.movieId === action.movie.movieId ? action.movie : movie
    );
    return {
      ...state,
      movies: updatedMovies,
      error: '',
    };
  }),
  on(MovieActions.editMovieFailure, (state, action): MovieState => {
    return {
      ...state,
      error: action.error,
    };
  }),

  on(MovieActions.deleteMovieSuccess, (state, action): MovieState => {
    const updatedMovies = state.movies.filter(
      (movie) => movie.movieId !== action.movieId
    );
    return {
      ...state,
      movies: updatedMovies,
      error: '',
    };
  }),
  on(MovieActions.deleteMovieFailure, (state, action): MovieState => {
    return {
      ...state,
      error: action.error,
    };
  })
);