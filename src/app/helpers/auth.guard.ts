import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthService
) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let allowedRoles = route.data['roles'];

      if(this.authenticationService.tokenValid && allowedRoles.includes(this.authenticationService.roleFromToken)) {
        return true;
      }

      //this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      //this.router.navigateByUrl("/login");
      this.authenticationService.logOut();
      return false;
  }
}
