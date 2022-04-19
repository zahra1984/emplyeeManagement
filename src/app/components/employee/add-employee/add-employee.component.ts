import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/dto/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  submitted = false;
  employee!: Employee;
  formAdd!: FormGroup;

  constructor(
    private employeeService: EmployeeService,
    private routing: Router,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.formAdd = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      jobTitle: new FormControl('', Validators.required),
    });
  }
  onClickSubmit(formData: any) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.formAdd.invalid) {
      this.formAdd.controls['name'].markAsTouched();
      this.formAdd.controls['phone'].markAsTouched();
      this.formAdd.controls['jobTitle'].markAsTouched();
      this.formAdd.controls['email'].markAsTouched();
      return;
    }

    this.employeeService.addEmployee(formData).subscribe(
      (respose) => {
        this.showSuccess();
        this.formAdd.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  get f() {
    return this.formAdd.controls;
  }
  showSuccess() {
    this.toast.info('add employee data.', 'done');
  }
  backHome() {
    this.routing.navigate(['']);
  }
}
