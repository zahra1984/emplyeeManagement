import { AddEmployeeComponent } from './components/employee/add-employee/add-employee.component';
import { EmployeeComponent } from './components/employee/list-employee/employee.component';
import { EditEmployeeComponent } from './components/employee/edit-employee/edit-employee.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadingComponent } from './components/chartReportGenerator/uploading/uploading.component';

const routes: Routes = [
  { path: '', component: EmployeeComponent },
  { path: 'addEmployee', component: AddEmployeeComponent },
  { path: 'editEmployee', component: EditEmployeeComponent },
  { path: 'upload', component: UploadingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
