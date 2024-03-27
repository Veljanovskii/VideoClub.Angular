import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, debounceTime, map, merge, of as observableOf, startWith, Subject, switchMap } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { UsersDialogComponent } from 'src/app/user/dialog/users-dialog.component';
import { Actions } from 'src/app/models/Actions'
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '220px'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class UsersComponent implements AfterViewInit {

  displayedColumns: string[] = ['ProfilePicture', 'FirstName', 'LastName', 'Address', 'Idnumber', 'MaritalStatus', 'InsertDate'];
  data: User[] = [];
  search = new FormControl('');
  loadUsers: Subject<any> = new Subject();
  dialogAction = Actions;
  expandedElement: User | null;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private userService: UserService,
    public dialog: MatDialog) { }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page, this.search.valueChanges.pipe(debounceTime(800)), this.loadUsers)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.userService!.getUsers(
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

          this.resultsLength = data.totalUsers;
          return data.users;
        }),
      )
      .subscribe(data => (this.data = data));
  }

  openDialog(action: Actions, obj: any) {
    const dialogRef = this.dialog.open(UsersDialogComponent, {
      width: action!=3?'610px':'375px',
      data: {
        action: action,
        obj: obj
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == true) {
        this.loadUsers.next(null);
      }
    });
  }

}
