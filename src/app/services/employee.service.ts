import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Employee } from '../dto/employee';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiServiceUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getAllEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServiceUrl}/employee/all`);
  }

  public getEmployeeById(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(
      `${this.apiServiceUrl}/employee/find/${employeeId}`
    );
  }

  public addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(
      this.apiServiceUrl + '/employee/add',
      employee
    );
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(
      `${this.apiServiceUrl}/employee/update`,
      employee
    );
  }

  public deleteEmployee(employeeId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServiceUrl}/employee/delete/` + employeeId
    );
  }
}
