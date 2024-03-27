import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Movie } from '../../models/Movie';
import { getMovies, getMovieError } from './movie.selectors';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MovieSelector {
  constructor(private store$: Store<any>) {}

  selectMovies(): Observable<Movie[]> {
    return this.store$.select(getMovies);
  }

  selectMovieError(): Observable<string> {
    return this.store$.select(getMovieError);
  }

  selectIsLoadingResults(): Observable<boolean> {
    return this.store$.select(state => state.movies.isLoadingResults);
  }
}
