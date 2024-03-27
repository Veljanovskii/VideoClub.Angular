import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { MovieDispatcher } from 'src/app/services/movie-dispatcher.service';

@Component({
  selector: 'app-delete-movie',
  templateUrl: './delete-movie.component.html',
  styleUrls: ['./delete-movie.component.css']
})
export class DeleteMovieComponent implements OnInit {
  movieId: number;
  destroy$ = new Subject<void>();

  constructor(
    private movieDispatcher: MovieDispatcher,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.movieId = data.index;
     }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  deleteMovie() {
    this.movieDispatcher.deleteMovie(this.movieId);
  }

}
