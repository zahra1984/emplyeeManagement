import { MatTableDataSource } from '@angular/material/table';
import { FreedomHappienesService } from 'src/app/services/Freedom/freedom-happienes.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {  FreedomHappienes } from 'src/app/dto/freedomHappienes';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';

@Component({
  selector: 'app-dynamic-grid',
  templateUrl: './dynamic-grid.component.html',
  styleUrls: ['./dynamic-grid.component.css'],
})
export class DynamicGridComponent implements OnInit {
  freedomHappienesList: FreedomHappienes[] = [];
  displayedColumns: string[] = ['country', 'countryIsoCode', 'region', 'freedomScore', 'happienesScore'];
  dataSource =new MatTableDataSource<FreedomHappienes> () ;
  @ViewChild(MatPaginator) paginator!: MatPaginator  ;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private service: FreedomHappienesService,
    private _liveAnnouncer: LiveAnnouncer) {}
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
   }
  ngOnInit(): void {

    this.service.getDataFreedomHappienes().subscribe((res) => {
      this.freedomHappienesList= res;
      this.dataSource= new MatTableDataSource<FreedomHappienes> (res);

    });
  }

   /** Announce the change in sort state for assistive technology. */
   announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
