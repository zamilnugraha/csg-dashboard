import { Helpers } from './../helpers';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './result-hour.component.html',
  styleUrls: ['./result-hour.component.css']
})
export class ResultHourComponent implements OnInit {

  constructor(
    private router: Router,
    private http: Http,
  ) { }

  cleanTask: Observable<any[]>;
  currentDate = new Date();
  field: any = {};
  resultHours: Observable<any[]>;
  dataDate: any ={};
  datePeriod1: any = '';
  datePeriod2: any = '';

  ngOnInit() {

  }

  doGetDataByID() {
    let self = this;
    Helpers.setLoading(true);

    var datePipe = new DatePipe('en-US');
    self.datePeriod1 = datePipe.transform(self.field.startDate, 'yyyyMMdd');
    self.datePeriod2 = datePipe.transform(self.field.endDate, 'yyyyMMdd');

    var urlGetByID = "http://localhost:8083/csg/resultByHour/" + self.datePeriod1 + "/" + self.datePeriod2;
    self.http.get(urlGetByID).subscribe(res => {
      var datas = res.json().datas;

      if (res.json().status == 100) {
        self.resultHours = datas;
        self.dataDate = datas;

      } else if (res.json().status == 0) {
        Swal.fire({
          title: 'Information',
          text: 'Data not found, please try again!',
          type: 'warning',
          confirmButtonText: 'OK'
        }).then(function (result) {
          localStorage.clear();
          window.location.reload();
        });
      }
      Helpers.setLoading(false);
    });

  }

  doPostData() {
    let self = this;

    if (!self.field.startDate) {
      self.alertDialogPost("Start Date");
    } else if (!self.field.endDate) {
      self.alertDialogPost("End Date");
    } else {
      self.doGetDataByID();
    }
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

}
