import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, debounceTime, map, merge, of as observableOf, startWith, Subject, switchMap } from 'rxjs';
import { Actions } from 'src/app/models/Actions';
import { Employee } from 'src/app/models/Employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeesDialogComponent } from 'src/app/employee/dialog/employees-dialog.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements AfterViewInit {

  displayedColumns: string[] = ['FirstName', 'LastName', 'Email', 'PhoneNumber', 'Role', 'Active', 'Options'];
  data: Employee[] = [];
  search = new FormControl('');
  loadEmployees: Subject<any> = new Subject();
  dialogAction =  Actions;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog) { }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page, this.search.valueChanges.pipe(debounceTime(800)), this.loadEmployees)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.employeeService!.getEmployees(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize,
            this.search.value
          ).pipe(catchError(() => observableOf(null)));
        }),
        map(data => {
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }

          this.resultsLength = data.totalEmployees;
          return data.employees;
        }),
      )
      .subscribe(data => (this.data = data));
  }

  openDialog(action: Actions, obj: any) {
    let width = action===3?375:600;
    const dialogRef = this.dialog.open(EmployeesDialogComponent, {
      width: width.toString()+'px',
      data: {
        action: action,
        obj: obj
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == true) {
        this.loadEmployees.next(null);
      }
    });
  }

}

