import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { TokenInfo } from '../models/TokenInfo';
import * as global from 'src/global';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = global.targetAPI + '/Login';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private tokenInfo: BehaviorSubject<TokenInfo>

  constructor(
    private _httpClient: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService) {
        this.tokenInfo = new BehaviorSubject<TokenInfo>(JSON.parse(localStorage.getItem('token') as string));
   }

  public get roleFromToken(): string {
    let token = localStorage.getItem("token") as string;
    if(token == null) {
      return null as any;
    }
    let decodedToken = this.jwtHelper.decodeToken(token);
    let role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    return role;
  }

  public get tokenValid(): boolean {
    let token = localStorage.getItem("token") as string;
    let valid = !this.jwtHelper.isTokenExpired(token);
    return valid;
  }

  login(credentials: any): Observable<any> {
    return this._httpClient.post<any>(this.loginUrl, {
      email: credentials.email,
      password: credentials.password
    }, this.httpOptions).pipe(
        map(token => {
          localStorage.setItem("token", JSON.stringify(token));
          this.tokenInfo.next(token);
          return token;
      }));
  }

  logOut() {
    localStorage.removeItem('token');
    this.tokenInfo.next(null as any);
    this.router.navigate(['/login']);
  }
}
