import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/dto/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';



@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  public employees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService,
    private router: Router, public readonly swalTargets: SwalPortalTargets
  ) {}

  ngOnInit(): void {

    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getAllEmployee().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public addEmployee():void
  {
    this.router.navigate(['/addEmployee']) ;
  }
  public editEmployee(employeeId: number): void {
    this.router.navigate(['/editEmployee'],
    {queryParams:{id:employeeId}});
  }

  public deleteEmployee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response:void ) => {
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }
}
