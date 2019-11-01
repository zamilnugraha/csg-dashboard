import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Helpers } from './../helpers';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clean-schedul',
  templateUrl: './clean-schedul.component.html',
  styleUrls: ['./clean-schedul.component.css']
})

export class CleanSchedulComponent implements OnInit {

  constructor(
    private router: Router,
    private http: Http,
  ) { }


  cleanSchedul: Observable<any[]>;
  field: any = {};
  urlNow: string;
  paramID: string;
  displaySave: boolean;
  isReadOnly: boolean;
  edited: boolean;
  listClean: any = [];
  URLWS: string = environment.apiEndpoint;

  ngOnInit() {
    this.doGetListClean();
    var url = this.URLWS + "/csg/cleanSchedulAll";
    this.http.get(url).subscribe(res => {
      var datas = res.json().datas;
      this.cleanSchedul = datas;
    });
    this.displaySave = true;
    this.isReadOnly = true
    this.edited = false;
  }

  doGetListClean() {
    Helpers.setLoading(true);
    var url = this.URLWS + "/csg/cleanAll";
    this.http.get(url).subscribe(res => {
      var datas = res.json().datas;
      this.listClean = datas;
      Helpers.setLoading(false);
    });
  }

  doPostData() {
    let self = this;
    let url = "";
    self.paramID = self.field.id;

    if (self.paramID === undefined) {
      url = self.URLWS + "/csg/cleanSchedulSave";
    } else {
      url = self.URLWS + "/csg/cleanSchedulUpdate/" + self.paramID;
    }

    if (!self.field.days) {
      self.alertDialogPost("Days");
    } else if (!self.field.kodeClean) {
      self.alertDialogPost("Clean Type");
    } else {
      if (this.paramID === undefined) {
        Swal.fire({
          title: 'Information',
          text: 'Are you sure to insert this clean schedul?',
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
          text: 'Are you sure to update this clean schedul?',
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
      "days": this.field.days,
      "kodeClean": this.field.kodeClean,
      "nik": this.field.nik
    }

    this.http.post(url, dataForm).map(res =>
      res.json()
    ).subscribe(result => {
      if (result.status == "0" || result.status == 0) {
        Helpers.setLoading(false);
        this.alertDialogResult(result.message);
      } else {
        Helpers.setLoading(false);
        this.router.navigate(['/clean-schedul']);
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
    var urlGetByID = self.URLWS + "/csg/cleanSchedulById/" + id;
    self.http.get(urlGetByID).subscribe(res => {
      var datas = res.json().datas;

      if (res.json().status == 100) {
        self.field = datas;

        self.field.id = datas.id;
        self.field.days = datas.days;
        self.field.kodeClean = datas.kodeClean;
        self.field.nik = datas.nik;

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
    var urldelete = self.URLWS + "/csg/cleanSchedulDelete/" + id;
    Swal.fire({
      title: 'Information',
      text: "Are you sure to delete this section?",
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
