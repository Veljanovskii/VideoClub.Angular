import { SortDirection } from '@angular/material/sort';
import { Movie } from '../../models/Movie';
import { createAction, props } from '@ngrx/store';

export namespace MovieActions {
    export const loadMovies = createAction(
      '[Movie] Load Movies',
      props<{ sort: string; order: SortDirection; page: number; size: number; search: string }>()
    );
  
    export const loadMoviesSuccess = createAction(
      '[Movie API] Load Movies Success',
      props<{ movies: Movie[] }>()
    );
  
    export const loadMoviesFailure = createAction(
      '[Movie API] Load Movies Fail',
      props<{ error: string }>()
    );
  
    export const editMovie = createAction(
      '[Movie] Edit Movie',
      props<{ movie: Movie }>()
    );
  
    export const editMovieSuccess = createAction(
      '[Movie API] Edit Movie Success',
      props<{ movie: Movie }>()
    );
  
    export const editMovieFailure = createAction(
      '[Movie API] Edit Movie Fail',
      props<{ error: string }>()
    );
  
    export const addMovie = createAction(
      '[Movie] Add Movie',
      props<{ movie: Movie }>()
    );
  
    export const addMovieSuccess = createAction(
      '[Movie API] Add Movie Success',
      props<{ movie: Movie }>()
    );
  
    export const addMovieFailure = createAction(
      '[Movie API] Add Movie Fail',
      props<{ error: string }>()
    );
  
    export const deleteMovie = createAction(
      '[Movie] Delete Movie',
      props<{ movieId: number }>()
    );
  
    export const deleteMovieSuccess = createAction(
      '[Movie API] Delete Movie Success',
      props<{ movieId: number }>()
    );
  
    export const deleteMovieFailure = createAction(
      '[Movie API] Delete Movie Fail',
      props<{ error: string }>()
    );
}