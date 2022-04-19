import { MatSortModule } from '@angular/material/sort';

import { MatPaginatorModule } from '@angular/material/paginator';
import { EmployeeComponent } from './components/employee/list-employee/employee.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './services/employee.service';
import { AddEmployeeComponent } from './components/employee/add-employee/add-employee.component';
import { EditEmployeeComponent } from './components/employee/edit-employee/edit-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UploadingComponent } from './components/chartReportGenerator/uploading/uploading.component';
import { MatTableModule } from '@angular/material/table';
import { NgChartsModule } from 'ng2-charts';
import { SidenaveComponent } from './components/sidenave/sidenave.component';
import { DynamicGridComponent } from './components/chartReportGenerator/dynamic-grid/dynamic-grid.component';
import { DynamicChartComponent } from './components/chartReportGenerator/dynamic-chart/dynamic-chart.component';
import { MatTabsModule } from '@angular/material/tabs';
import { LoadDynamicComponent } from './components/chartReportGenerator/load-dynamic/load-dynamic.component';
import { DialogModule } from '@ngneat/dialog';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    UploadingComponent,
    SidenaveComponent,
    DynamicChartComponent,
    DynamicGridComponent,
    LoadDynamicComponent,
  ],
  imports: [
    NgChartsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SweetAlert2Module.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-center-center',
      preventDuplicates: true,
    }),
    DialogModule.forRoot(),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
