import { Component, OnInit } from '@angular/core';
import { MovieDispatcher } from './services/movie-dispatcher.service';
import { MovieActions } from './movie/state/movie.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'VideoClub';

  constructor(private dispatcher: MovieDispatcher) {}

  ngOnInit(): void {
    // this.dispatcher.loadMovies({
    //   sort: 'Id', // Default sorting column
    //   order: 'desc', // Default sorting order
    //   page: 0, // Default page index
    //   size: 100, // Default page size
    //   search: '' // Default search query
    // });
  }
}
