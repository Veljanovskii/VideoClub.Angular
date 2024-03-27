import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Action } from '@ngrx/store';
import { MovieActions } from '../movie/state/movie.actions';
import { Movie } from '../models/Movie';
import { SortDirection } from '@angular/material/sort';

@Injectable({
  providedIn: 'root',
})
export class MovieDispatcher {
  constructor(private store$: Store<any>) {}

  loadMovies(params: { sort: string; order: SortDirection; page: number; size: number; search: string }): void {
    this.store$.dispatch(MovieActions.loadMovies(params));
  }

  addMovie(movie: Movie): void {
    this.store$.dispatch(MovieActions.addMovie({ movie }));
  }

  editMovie(movie: Movie): void {
    this.store$.dispatch(MovieActions.editMovie({ movie }));
  }

  deleteMovie(movieId: number): void {
    this.store$.dispatch(MovieActions.deleteMovie({ movieId }));
  }
}
