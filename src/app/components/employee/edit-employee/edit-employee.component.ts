import { HttpErrorResponse } from '@angular/common/http';
import { EmployeeService } from './../../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/dto/employee';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit {
  id: number = 0;
  submitted = false;
  employee!: Employee;
  formEdit!: FormGroup;

  constructor(
    private employeeService: EmployeeService,
    private router: ActivatedRoute,
    private routing: Router,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.formEdit = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      jobTitle: new FormControl('', Validators.required),
    });
    this.router.queryParams.subscribe((p) => {
      this.id = Number(p['id']);
      this.employeeService
        .getEmployeeById(this.id)
        .subscribe((response: Employee) => {
          this.employee = response;

          this.formEdit = new FormGroup({
            id: new FormControl(this.employee.id),
            name: new FormControl(this.employee.name, Validators.required),
            email: new FormControl(this.employee.email, [
              Validators.required,
              Validators.email,
            ]),
            phone: new FormControl(this.employee.phone, Validators.required),
            jobTitle: new FormControl(
              this.employee.jobTitle,
              Validators.required
            ),
          });
        });
    });
  }
  onClickSubmit(formData: any) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.formEdit.invalid) {
      console.log('fff!');

      return;
    }

    console.log(formData);
    this.employeeService.updateEmployee(formData).subscribe(
      (respose: Employee) => {
        console.log(respose);
        this.showSuccess();
      },
      (error: HttpErrorResponse) => {
        this.showError(error.message);
      }
    );
  }

  get f() {
    return this.formEdit.controls;
  }
  showSuccess() {
    this.toast.info('update employee data.', 'done');
  }
  showError(message: string) {
    this.toast.error(message, 'error!');
  }

  backHome() {
    this.routing.navigate(['']);
  }
}
