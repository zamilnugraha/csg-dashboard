import { Helpers } from '../helpers';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-staff-schedul',
  templateUrl: './staff-schedul.component.html',
  styleUrls: ['./staff-schedul.component.css']
})
export class StaffSchedulComponent implements OnInit {
  constructor(
    private router: Router,
    private http: Http,
  ) { }

  listStaffSchedul: Observable<any[]>;
  field: any = {};
  urlNow: string;
  paramID: string;
  displaySave: boolean;
  isReadOnly: boolean;
  edited: boolean;
  listCrew: any = [];
  URLWS=environment.apiEndpoint;

  ngOnInit() {
    var url = this.URLWS + "/csg/staffAll";
    this.http.get(url).subscribe(res => {
      var datas = res.json().datas;
      this.listStaffSchedul = datas;
    });
    this.displaySave = true;
    this.isReadOnly = true
    this.edited = false;
    this.doGetListClean();
  }

  doGetListClean() {
    Helpers.setLoading(true);
    var url = this.URLWS + "/csg/crewAll";
    this.http.get(url).subscribe(res => {
      var datas = res.json().datas;
      this.listCrew = datas;
      Helpers.setLoading(false);
    });
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 58 && charCode != 79 && charCode != 70 && charCode != 67 && charCode != 84) {
      return false;
    }
    return true;
  }

  doPostData() {
    let self = this;
    let url = "";
    self.paramID = self.field.id;

    if (self.paramID === undefined) {
      url = self.URLWS + "/csg/staffSave";
    } else {
      url = self.URLWS + "/csg/staffUpdate/" + self.paramID;
    }

    if (!self.field.nik) {
      self.alertDialogPost("Crew Name");
    } else if (!self.field.startTime) {
      self.alertDialogPost("Start Time");
    } else if (!self.field.endTime) {
      self.alertDialogPost("End Time");
    } else if (!self.field.days) {
      self.alertDialogPost("Days");
    } else {
      if (this.paramID === undefined) {
        Swal.fire({
          title: 'Information',
          text: 'Are you sure to insert this data?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes'
        }).then(function (result) {
          if (result.value) {
            Helpers.setLoading(true);
            self.doPostDataProcess(url);
            location.reload();
          }
        });
      } else {
        Swal.fire({
          title: 'Information',
          text: 'Are you sure to update this data?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes'
        }).then(function (result) {
          if (result.value) {
            Helpers.setLoading(true);
            self.doPostDataProcess(url);
            location.reload();
          }
        });
      }
    }
  }

  doPostDataProcess(url) {
    var dataForm = {
      "id": this.field.id,
      "crewId": this.field.nik,
      "startDate": this.field.startTime,
      "endDate": this.field.endTime,
      "dateWork": this.field.days
    }

    this.http.post(url, dataForm).map(res =>
      res.json()
    ).subscribe(result => {
      if (result.status == "0" || result.status == 0) {
        Helpers.setLoading(false);
        this.alertDialogResult(result.message);
      } else {
        Helpers.setLoading(false);
        this.router.navigate(['/staff-schedul']);
        location.reload();
      }

    }, (err) => {
      console.log(err);
      Helpers.setLoading(false);
    });
  }

  doGetDataByID(id) {
    let self = this;
    Helpers.setLoading(true);

    if (id != null || id != "") {
      this.displaySave = false;
      this.isReadOnly = false;
    } else {
      this.displaySave = true
    }
    var urlGetByID = self.URLWS + "/csg/staffById/" + id;
    self.http.get(urlGetByID).subscribe(res => {
      var datas = res.json().datas;

      if (res.json().status == 100) {
        self.field = datas;

        self.field.id = datas.id;
        self.field.nik = datas.crewId;
        self.field.startTime = datas.startDate;
        self.field.endTime = datas.endDate;
        self.field.days = datas.dateWork;

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

  doDelete(id) {
    let self = this;
    var urldelete = self.URLWS + "/csg/staffDelete/" + id;
    Swal.fire({
      title: 'Information',
      text: "Are you sure to delete this crew?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes'
    }).then(function (result) {
      if (result.value) {
        Helpers.setLoading(true);
        self.http.get(urldelete).map(res =>
          res.json()
        ).subscribe(result => {
          self.processDelete(result);
        }, (err) => {
          console.log(err);
        });
      }
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

  processDelete(result) {
    if (result.status == "100" || result.status == 100) {
      Helpers.setLoading(false);
      Swal.fire({
        title: 'Deleted',
        text: "Your content has been deleted.",
        type: 'success'
      }).then(function (result) {
        window.location.reload();
      });
    } else {
      Helpers.setLoading(false);
      Swal.fire({
        title: 'Deleted',
        text: "Failed deleted.",
        type: 'warning'
      }).then(function (result) {
        window.location.reload();
      });
    }
  }

  doCancel() {
    location.reload();
  }

   doDetailSchedul() {
    this.router.navigate(['/detail-schedul']);
  }


}
