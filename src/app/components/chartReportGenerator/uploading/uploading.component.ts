import { FreedomHappienes } from '../../../dto/freedomHappienes';
import { ToastrService } from 'ngx-toastr';
import { FreedomHappienesService } from '../../../services/Freedom/freedom-happienes.service';

import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import readXlsxFile from 'read-excel-file';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService } from '@ngneat/dialog';

@Component({
  selector: 'app-uploading',
  templateUrl: './uploading.component.html',
  styleUrls: ['./uploading.component.css'],
})
export class UploadingComponent implements OnInit {
  fileToUpload: File | null = null;
  excelRows: any[][] | null = null;
  freedomHappienesList: FreedomHappienes[] = [];
  showTabs: boolean = false;

  constructor(
    private service: FreedomHappienesService,
    private toast: ToastrService,
    private dialog: DialogService
  ) {}

  ngOnInit(): void {}

  async loadDynamicData() {
    const { LoadDynamicComponent } = await import(
      '../load-dynamic/load-dynamic.component'
    );
    this.dialog.open(LoadDynamicComponent, { width: '95vw', height: '100vh' });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(files[0].name.indexOf('.xlsx'));

    //check excel file
    if (files[0].name.indexOf('.xlsx') === -1) {
      this.showError("Please upload excel file.");
      return;
    }

    readXlsxFile(files[0]).then((rows) => {
      this.excelRows = rows;
      for (let row of rows) {
        if (
          typeof row[0] == 'string' &&
          typeof row[3] == 'number' &&
          typeof row[5] == 'number'
        ) {
          let itemConverted: FreedomHappienes = {
            countryIsoCode: row[0].toString(),
            country: row[1].toString(),
            region: row[2].toString(),
            freedomScore: Number(row[3]),
            happienesScore: Number(row[5]),
          };

          this.freedomHappienesList.push(itemConverted);
        }
      }
      //incorecet excel file format
      if (this.freedomHappienesList.length === 0) {
        this.showError('Please check excel formating.');
        return;
      }
      //sort
      this.freedomHappienesList = this.freedomHappienesList.sort((a, b) => {
        if (a.freedomScore < b.freedomScore) {
          return -1;
        }
        if (a.freedomScore > b.freedomScore) {
          return 1;
        }
        return 0;
      });
      this.service.setDataFreedomHappines(this.freedomHappienesList);

      this.loadDynamicData();
      this.showTabs = true;
    });
  }

  saveAllData() {
    this.service.addFreedomHappines(this.freedomHappienesList).subscribe(
      (res) => {
        this.showSuccess('Import Data into Database completely!!');
      },
      (error: HttpErrorResponse) => {
        this.showError(error.message);
      }
    );
  }

  showSuccess(message: string) {
    this.toast.info(message, 'done');
  }
  showError(message: string) {
    this.toast.error(message, 'error!');
  }
}
