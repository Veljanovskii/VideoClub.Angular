import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employee/employees/employees.component';
import { LoginComponent } from './login/login.component';
import { MoviesComponent } from './movie/movies/movies.component'
import { UsersComponent } from './user/users/users.component';
import { AuthGuard } from './helpers/auth.guard';
import { Role } from './models/Role';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movies', component: MoviesComponent, canActivate: [AuthGuard], data: { roles: [Role.Administrator, Role.User] } },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard], data: { roles: [Role.Administrator, Role.User] } },
  { path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard], data: { roles: [Role.Administrator] } },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
