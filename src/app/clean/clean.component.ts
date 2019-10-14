import { Helpers } from './../helpers';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clean',
  templateUrl: './clean.component.html',
  styleUrls: ['./clean.component.css']
})
export class CleanComponent implements OnInit {
  constructor(
    private router: Router,
    private http: Http,
  ) { }

  clean: Observable<any[]>;
  field: any = {};
  urlNow: string;
  paramID: string;
  displaySave: boolean;
  isReadOnly: boolean;
  edited: boolean;

  ngOnInit() {
    var url = "http://localhost:8083/csg/cleanAll";
    this.http.get(url).subscribe(res => {
      var datas = res.json().datas;
      this.clean = datas;
    });
    this.displaySave = true;
    this.isReadOnly = true
    this.edited = false;
  }

  doPostData() {
    let self = this;
    let url = "";
    self.paramID = self.field.id;
    
    if (self.paramID === undefined) {
      url = "http://localhost:8083/csg/cleanSave";
    } else {
      url = "http://localhost:8083/csg/cleanUpdate/" + self.paramID;
    }

    if (!self.field.posisi) {
      self.alertDialogPost("Position");
    } else if (!self.field.cleanLocation) {
      self.alertDialogPost("Clean Location");
    } else if (!self.field.cleanType) {
      self.alertDialogPost("Clean Type");
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
      } else{
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
      "kodeClean": this.field.id,
      "posisi": this.field.posisi,
      "cleaningLocation": this.field.cleanLocation,
      "cleaningType": this.field.cleanType
    }

    this.http.post(url, dataForm).map(res =>
      res.json()
    ).subscribe(result => {
      if (result.status == "0" || result.status == 0) {
        Helpers.setLoading(false);
        this.alertDialogResult(result.message);
      } else {
        Helpers.setLoading(false);
        this.router.navigate(['/clean']);
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
    var urlGetByID = "http://localhost:8083/csg/cleanById/" + id;
    self.http.get(urlGetByID).subscribe(res => {
      var datas = res.json().datas;

      if (res.json().status == 100) {
        self.field = datas;

        self.field.id = datas.kodeClean;
        self.field.posisi = datas.posisi;
        self.field.cleanLocation = datas.cleaningLocation;
        self.field.cleanType = datas.cleaningType;

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
    var urldelete = "http://localhost:8083/csg/cleanDelete/" + id;
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
