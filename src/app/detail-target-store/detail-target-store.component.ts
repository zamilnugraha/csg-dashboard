import { Helpers } from '../helpers';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { OwlDateTimeComponent, DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { MomentDateTimeAdapter } from 'ng-pick-datetime-moment';
import { environment } from 'environments/environment';

const moment = (_moment as any).default ? (_moment as any).default : _moment;

export const MY_MOMENT_DATE_TIME_FORMATS = {
  parseInput: 'MM/YYYY',
  fullPickerInput: 'l LT',
  datePickerInput: 'MM/YYYY',
  timePickerInput: 'LT',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY',
};

@Component({
  selector: 'app-detail-target-store',
  templateUrl: './detail-target-store.component.html',
  providers: [
    { provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE] },
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_DATE_TIME_FORMATS },
  ],
  styleUrls: ['./detail-target-store.component.css'],
})
export class DetailTargetStoreComponent implements OnInit {
  public date = new FormControl(moment());

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: OwlDateTimeComponent<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  constructor(
    private router: Router,
    private http: Http,
  ) { }

  dataTarget: Observable<any[]>;
  field: any = {};
  title: any;
  datePeriod1: any = '';
  dateInput: any = '';
  dataTotal: any = [];
  totalAllSales = 0;
  totalAllTrans = 0;
  totalTargetSales = 0;
  totalTragetTrans = 0;
  URLWS=environment.apiEndpoint;

  ngOnInit() {
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  doPostData() {
    let self = this;

    var datePipe = new DatePipe('en-US');
    self.datePeriod1 = datePipe.transform(self.field.datePeriod, 'yyyyMMdd');

    if (self.field.typeOrder = 'ETA') {
      self.title = 'Mother Store';
    } else if (self.field.typeOrder = 'DRT') {
      self.title = 'Drive Thrue';
    } else if (self.field.typeOrder = 'HMD') {
      self.title = 'Home Delivery';
    } else if (self.field.typeOrder = 'CSP') {
      self.title = 'Coffee Shop';
    }

    if (!self.field.typeOrder) {
      self.alertDialogPost("Type Store");
    } else {
      self.doGetDataByID();
    }
  }


  doGetDataByID() {
    let self = this;
    Helpers.setLoading(true);
    
    var datePipe = new DatePipe('en-US');
    self.dateInput = datePipe.transform(self.date.value._d, 'yyyyMM');

    console.log(self.dateInput)

    var urlGetByID = self.URLWS + "/csg/targetStore/" + self.dateInput + "/" + self.field.typeOrder;
    self.http.get(urlGetByID).subscribe(res => {
      var datas = res.json().datas;

      if (res.json().status == 100) {
        self.dataTarget = datas;

        for(let i=0; i<datas.length; i++){
          self.totalAllSales += parseInt(datas[i].totalSales);
          self.totalAllTrans += parseInt(datas[i].nRows);
        }

      } else if (res.json().status == 0) {
        Swal.fire({
          title: 'Information',
          text: 'Data not found, please try again!',
          type: 'warning',
          confirmButtonText: 'OK'
        }).then(function (result) {
          localStorage.clear();
        });
      }
      Helpers.setLoading(false);
    });
  }

  alertDialogPost(value) {
    Swal.fire({
      title: 'Information',
      text: 'Mohon maaf ' + value + ' anda masih kosong!',
      type: 'warning',
      confirmButtonText: 'OK'
    })
  }

  alertDialogResult(value) {
    Swal.fire({
      title: 'Information',
      text: 'Error: ' + value,
      type: 'warning',
      confirmButtonText: 'OK'
    })
  }

  doCancel() {
    this.router.navigate(['/target-store']);
  }

}
