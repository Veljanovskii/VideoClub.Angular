import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/Movie';
import { MoviesCount } from 'src/app/models/MoviesCount';
import * as global from 'src/global';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private moviesUrl = global.targetAPI + '/Movie';

  constructor(private _httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getMovies(sort: string, order: SortDirection, page: number, size:number, search:string): Observable<MoviesCount> {
    let params = new HttpParams();
    params = params.append('sort', sort);
    params = params.append('order', order);
    params = params.append('page', page);
    params = params.append('size', size);
    params = params.append('search', search);

    return this._httpClient.get<MoviesCount>(this.moviesUrl, {params: params});
  }

  addMovie(movie: Movie): Observable<Movie> {
    movie.insertDate = new Date();
    return this._httpClient.post<Movie>(this.moviesUrl, movie, this.httpOptions);
  }

  editMovie(movie: Movie): Observable<any> {
    return this._httpClient.put(this.moviesUrl, movie, this.httpOptions);
  }

  deleteMovie(id: number): Observable<Movie> {
    const target = `${this.moviesUrl}/${id}`;

    return this._httpClient.delete<Movie>(target, this.httpOptions);
  }
}
