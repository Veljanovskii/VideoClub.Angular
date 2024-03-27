import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { HttpClientModule } from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { JwtHelperService, JWT_OPTIONS } from "@auth0/angular-jwt";
import { authInterceptorProviders } from 'src/app/interceptors/auth.interceptor';
import { MatStepperModule } from '@angular/material/stepper';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppComponent } from './app.component';
import { UsersComponent } from 'src/app/user/users/users.component';
import { MoviesComponent } from 'src/app/movie/movies/movies.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddMovieComponent } from 'src/app/movie/add-movie/add-movie.component';
import { EditMovieComponent } from 'src/app/movie/edit-movie/edit-movie.component';
import { AppRoutingModule } from './app-routing.module';
import { DeleteMovieComponent } from 'src/app/movie//delete-movie/delete-movie.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { UsersDialogComponent } from './user/dialog/users-dialog.component';
import { EmployeesDialogComponent } from './employee/dialog/employees-dialog.component';
import { LoginComponent } from './login/login.component';
import { EmployeesComponent } from './employee/employees/employees.component';
import { HomeComponent } from './home/home.component';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { movieReducer } from './movie/state/movie.reducer';
import { State } from './index';
import { MovieEffects } from './movie/state/movie.effects';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    MoviesComponent,
    AddMovieComponent,
    EditMovieComponent,
    DeleteMovieComponent,
    HeaderComponent,
    SidenavComponent,
    UsersDialogComponent,
    LoginComponent,
    EmployeesComponent,
    EmployeesDialogComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatSortModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AppRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatListModule,
    MatSelectModule,
    MatCardModule,
    MatStepperModule,
    MatGridListModule,
    NgxMatSelectSearchModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatCheckboxModule,
    StoreModule.forRoot({
      movies: movieReducer
    }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([MovieEffects]),
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
