import { Helpers } from './../helpers';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { Http } from '@angular/http';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-crew',
  templateUrl: './crew.component.html',
  styleUrls: ['./crew.component.css']
})
export class CrewComponent implements OnInit {
  constructor(
    private router: Router,
    private http: Http,
  ) { }

  crews: Observable<any[]>;
  field: any = {};
  urlNow: string;
  displaySave: boolean;
  isReadOnly: boolean;

  ngOnInit() {
    var url = "http://localhost:8083/csg/crewAll";
    this.http.get(url).subscribe(res => {
      var datas = res.json().datas;
      this.crews = datas;
    });
    this.displaySave = true;
    this.isReadOnly = true
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
    let url = "";

    if (self.displaySave) {
      url = "http://localhost:8083/csg/crewSave";
    } else {
      url = "http://localhost:8083/csg/crewUpdate/" + self.field.nik;
    }

    if (!self.field.kodeStore) {
      self.alertDialogPost("Kode Store");
    } else if (!self.field.nik) {
      self.alertDialogPost("NIK");
    } else if (!self.field.name) {
      self.alertDialogPost("Name");
    } else if (!self.field.position) {
      self.alertDialogPost("Position");
    } else if (!self.field.status) {
      self.alertDialogPost("Status");
    } else {
      if (self.displaySave) {
        Swal.fire({
          title: 'Information',
          text: 'Are you sure to insert this crew?',
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
          text: 'Are you sure to update this crew?',
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
      "kodeStore": this.field.kodeStore,
      "nik": this.field.nik,
      "nama": this.field.name,
      "jabatan": this.field.position,
      "status": this.field.status
    }

    this.http.post(url, dataForm).map(res =>
      res.json()
    ).subscribe(result => {
      if (result.status == "0" || result.status == 0) {
        Helpers.setLoading(false);
        this.alertDialogResult(result.message);
      } else {
        Helpers.setLoading(false);
        this.router.navigate(['/crew']);
        location.reload();
      }

    }, (err) => {
      console.log(err);
      Helpers.setLoading(false);
    });
  }

  doGetDataByID(nik) {
    let self = this;
    Helpers.setLoading(true);

    if (nik != null || nik != "") {
      this.displaySave = false;
      this.isReadOnly = false;
    } else {
      this.displaySave = true
    }
    var urlGetByID = "http://localhost:8083/csg/crewById/" + nik;
    self.http.get(urlGetByID).subscribe(res => {
      var datas = res.json().datas;

      if (res.json().status == 100) {
        self.field = datas;

        self.field.kodeStore = datas.kodeStore;
        self.field.nik = datas.nik;
        self.field.name = datas.nama;
        self.field.position = datas.jabatan;
        self.field.status = datas.status;

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

  doDelete(nik) {
    let self = this;
    var urldelete = "http://localhost:8083/csg/crewDelete/" + nik;
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
}