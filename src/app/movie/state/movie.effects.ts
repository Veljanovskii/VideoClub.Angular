import { Injectable } from '@angular/core';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MovieService } from '../../services/movie.service';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MovieActions } from './movie.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class MovieEffects {
  constructor(
    private actions$: Actions, 
    private movieService: MovieService, 
    private snackBar: MatSnackBar) { }

  loadMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MovieActions.loadMovies),
      mergeMap((action) => this.movieService.getMovies(
        action.sort,
        action.order,
        action.page,
        action.size,
        action.search
      ).pipe(
        map(response => MovieActions.loadMoviesSuccess({ movies: response.movies })),
        catchError(error => of(MovieActions.loadMoviesFailure({ error })))
      ))
    );
  });

  editMovie$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MovieActions.editMovie),
      mergeMap((action) => this.movieService.editMovie(action.movie)
        .pipe(
          map(() => {
            this.snackBar.open('Movie edited successfully', 'Close', {
              duration: 3000,
              panelClass: ['snackbar-success']
            });
            return MovieActions.editMovieSuccess({ movie: action.movie });
          }),
          catchError(error => {
            this.snackBar.open('Failed to edit movie', 'Close', {
              duration: 3000,
              panelClass: ['snackbar-error']
            });
            return of(MovieActions.editMovieFailure({ error }));
          })
        )
      )
    );
  });

  addMovie$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MovieActions.addMovie),
      mergeMap((action) => this.movieService.addMovie(action.movie)
        .pipe(
          map((movie) => {
            this.snackBar.open('Movie added successfully', 'Close', {
              duration: 3000,
              panelClass: ['snackbar-success']
            });
            return MovieActions.addMovieSuccess({ movie });
          }),
          catchError(error => {
            this.snackBar.open('Failed to add movie', 'Close', {
              duration: 3000,
              panelClass: ['snackbar-error']
            });
            return of(MovieActions.addMovieFailure({ error }));
          })
        )
      )
    );
  });

  deleteMovie$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MovieActions.deleteMovie),
      mergeMap((action) => this.movieService.deleteMovie(action.movieId)
        .pipe(
          map(() => {
            this.snackBar.open('Movie deleted successfully', 'Close', {
              duration: 3000,
              panelClass: ['snackbar-success']
            });
            return MovieActions.deleteMovieSuccess({ movieId: action.movieId });
          }),
          catchError(error => {
            this.snackBar.open('Failed to delete movie', 'Close', {
              duration: 3000,
              panelClass: ['snackbar-error']
            });
            return of(MovieActions.deleteMovieFailure({ error }));
          })
        )
      )
    );
  });
}