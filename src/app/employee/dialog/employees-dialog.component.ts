import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Actions } from 'src/app/models/Actions';
import { Employee } from 'src/app/models/Employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './employees-dialog.component.html',
  styleUrls: ['./employees-dialog.component.css']
})
export class EmployeesDialogComponent implements OnInit {
  dialog: FormGroup;
  action: Actions;
  employee = <Employee>{};
  index: number;
  validRoles: Array<string> = ['Administrator', 'User'];

  constructor(
    private employeeService: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.action = data.action;

      if(this.action == Actions.Add) {
        this.dialog = new FormGroup({
          firstName: new FormControl('', [Validators.required]),
          lastName: new FormControl('', [Validators.required]),
          email: new FormControl('', [Validators.required]),
          password: new FormControl('', [Validators.required]),
          phoneNumber: new FormControl('', [Validators.required]),
          role: new FormControl('', [Validators.required])
        });
    }

    if(this.action == Actions.Edit) {
      this.employee = data.obj;

      this.dialog = new FormGroup({
        firstName: new FormControl(this.employee.firstName, [Validators.required]),
        lastName: new FormControl(this.employee.lastName, [Validators.required]),
        email: new FormControl(this.employee.email, [Validators.required]),
        password: new FormControl(this.employee.password),
        phoneNumber: new FormControl(this.employee.phoneNumber, [Validators.required]),
        role: new FormControl(this.employee.role, [Validators.required])
      });
    }

    if(this.action == Actions.Delete) {
      this.index = data.obj;
    }
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.action == Actions.Add) {
      this.addEmployee();
    }

    if(this.action == Actions.Edit) {
      this.editEmployee();
    }

    if(this.action == Actions.Delete) {
      this.deleteEmployee();
    }
  }

  addEmployee() {
    this.employeeService.addEmployee(this.dialog.value).subscribe();
  }

  editEmployee() {
    this.employee.firstName = this.dialog.controls['firstName'].value;
    this.employee.lastName = this.dialog.controls['lastName'].value;
    this.employee.email = this.dialog.controls['email'].value;
    this.employee.password = this.dialog.controls['password'].value;
    this.employee.phoneNumber = this.dialog.controls['phoneNumber'].value;
    this.employee.role = this.dialog.controls['role'].value;

    this.employeeService.editEmployee(this.employee).subscribe();
  }

  deleteEmployee() {
    this.employeeService.deleteEmployee(this.index).subscribe();
  }

}
