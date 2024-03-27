import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { catchError, Observable, tap } from 'rxjs';
import { Employee } from '../models/Employee';
import { EmployeesCount } from '../models/EmployeesCount';
import * as global from 'src/global';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeesUrl = global.targetAPI + '/Employee';

  constructor(private _httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getEmployee(id: string): Observable<Employee> {
    this.employeesUrl+"/${id}";

    return this._httpClient.get<Employee>(this.employeesUrl);
  }

  getEmployees(sort: string, order: SortDirection, page: number, size:number, search:string): Observable<EmployeesCount> {
    let params = new HttpParams();
    params = params.append('sort', sort);
    params = params.append('order', order);
    params = params.append('page', page);
    params = params.append('size', size);
    params = params.append('search', search);

    return this._httpClient.get<EmployeesCount>(this.employeesUrl, {params: params});
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this._httpClient.post<Employee>(this.employeesUrl, employee, this.httpOptions);
  }

  editEmployee(employee: Employee): Observable<any> {
    return this._httpClient.put(this.employeesUrl, employee, this.httpOptions);
  }

  deleteEmployee(id: number): Observable<Employee> {
    const target = `${this.employeesUrl}/${id}`;

    return this._httpClient.delete<Employee>(target, this.httpOptions);
  }
}
