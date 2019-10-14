import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Helpers } from './../helpers';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-clean-section',
  templateUrl: './clean-section.component.html',
  styleUrls: ['./clean-section.component.css']
})
export class CleanSectionComponent implements OnInit {

  constructor(
    private router: Router,
    private http: Http,
  ) { }

  section: Observable<any[]>;
  field: any = {};
  urlNow: string;
  paramID: string;
  displaySave: boolean;
  isReadOnly: boolean;
  edited: boolean;

  ngOnInit() {
    var url = "http://localhost:8083/csg/sectionAll";
    this.http.get(url).subscribe(res => {
      var datas = res.json().datas;
      this.section = datas;
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
      url = "http://localhost:8083/csg/sectionSave";
    } else {
      url = "http://localhost:8083/csg/sectionUpdate/" + self.paramID;
    }

    if (!self.field.sectionName) {
      self.alertDialogPost("Section");
    } else {
      if (this.paramID === undefined) {
        Swal.fire({
          title: 'Information',
          text: 'Are you sure to insert this section?',
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
          text: 'Are you sure to update this section?',
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
      "kodeSection": this.field.id,
      "sectionName": this.field.sectionName
    }

    this.http.post(url, dataForm).map(res =>
      res.json()
    ).subscribe(result => {
      if (result.status == "0" || result.status == 0) {
        Helpers.setLoading(false);
        this.alertDialogResult(result.message);
      } else {
        Helpers.setLoading(false);
        this.router.navigate(['/clean-section']);
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
    var urlGetByID = "http://localhost:8083/csg/sectionById/" + id;
    self.http.get(urlGetByID).subscribe(res => {
      var datas = res.json().datas;

      if (res.json().status == 100) {
        self.field = datas;

        self.field.id = datas.kodeSection;
        self.field.sectionName = datas.sectionName;

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
    var urldelete = "http://localhost:8083/csg/sectionDelete/" + id;
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
