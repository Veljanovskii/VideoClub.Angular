import { Component, AfterViewInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MovieService } from 'src/app/services/movie.service';
import { catchError, merge, startWith, switchMap, of as observableOf, map, debounceTime, Subject, takeUntil, Observable } from 'rxjs';
import { Movie } from 'src/app/models/Movie';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddMovieComponent } from 'src/app/movie/add-movie/add-movie.component';
import { EditMovieComponent } from 'src/app/movie/edit-movie/edit-movie.component';
import { DeleteMovieComponent } from 'src/app/movie/delete-movie/delete-movie.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MovieDispatcher } from 'src/app/services/movie-dispatcher.service';
import { MovieSelector } from '../state/movie.selector';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '220px'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MoviesComponent implements AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['Avatar','Caption', 'Release', 'Length', 'Insert'];
  //data: Movie[] = [];
  //movies$: Observable<Movie[]>;
  dataSource!: MatTableDataSource<Movie>;
  search = new FormControl('');
  //loadMovies$: Subject<any> = new Subject();
  //destroy$ = new Subject<void>();
  expandedElement: Movie | null;
  unsubscribeSubject$: Subject<any> = new Subject<any>();

  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private movieDispatcher: MovieDispatcher,
    private movieSelector: MovieSelector,
    public dialogAdd: MatDialog,
    public dialogEdit: MatDialog,
    public dialogDelete: MatDialog,    
    private cdr: ChangeDetectorRef) { }

    ngAfterViewInit(): void {
      this.movieSelector.selectMovies()
        .pipe(takeUntil(this.unsubscribeSubject$))
        .subscribe((movies) => {
          const dataSource = new MatTableDataSource(movies);
          dataSource.paginator = this.paginator;
          dataSource.sort = this.sort;
          this.dataSource = dataSource;
          this.cdr.detectChanges();
        });

        this.movieSelector.selectIsLoadingResults()
          .pipe(takeUntil(this.unsubscribeSubject$))
          .subscribe((isLoading) => {
            this.isLoadingResults = isLoading;
            this.cdr.detectChanges();
          });
  
        this.sort.sortChange.pipe(takeUntil(this.unsubscribeSubject$)).subscribe(() => {
          this.paginator.pageIndex = 0;
          this.loadMovies();
        });
    
        this.paginator.page.pipe(takeUntil(this.unsubscribeSubject$)).subscribe(() => {
          this.loadMovies();
        });
    
        this.search.valueChanges.pipe(debounceTime(800), takeUntil(this.unsubscribeSubject$)).subscribe(() => {
          this.paginator.pageIndex = 0;
          this.loadMovies();
        });
    
        // Load initial set of movies
        this.loadMovies();
    }
  
    loadMovies(): void {
      this.movieDispatcher.loadMovies({
        sort: this.sort.active,
        order: this.sort.direction,
        page: this.paginator.pageIndex,
        size: this.paginator.pageSize,
        search: this.search.value
      });
    }

  openAddDialog(): void {
    const dialogAddRef = this.dialogAdd.open(AddMovieComponent, {
      width: '600px',
    });

    dialogAddRef.afterClosed().subscribe(result => {
      if(result == true) {
        this.loadMovies();
      }
    });
  }

  openEditDialog(movie: Movie): void {
    const dialogEditRef = this.dialogEdit.open(EditMovieComponent, {
      width: '600px',
      data: {
        movie: movie,
      },
    });

    dialogEditRef.afterClosed().subscribe(result => {
      if(result == true) {
        this.loadMovies();
      }
    });
  }

  openDeleteDialog(id: number): void {
    const dialogDeleteRef = this.dialogDelete.open(DeleteMovieComponent, {
      width: '375px',
      data: {
        index: id
      }
    });

    dialogDeleteRef.afterClosed().subscribe(result => {
      if(result == true) {
        this.loadMovies();
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeSubject$.next(true);
    this.unsubscribeSubject$.complete();
  }

}
