import { Observable } from 'rxjs';
import Swal from 'sweetalert2'
import { Helpers } from './../helpers';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(
    private router: Router,
    private http: Http,
  ) { }

  field: any = {};
  profile: Observable<any[]>;
  dataItem: any ={};
  dataTrans: any ={};
  dataEatIn: any ={};
  dataProfile: Observable<any[]>;
  hasilItem:number;
  hasilEat:number;
  totalEat :any;
  totalHasilEat :any;

  ngOnInit() {
    this.doGetDataByID();
  }

  doGetDataByID() {
    let self = this;

    var urlGetByID = "http://localhost:8083/csg/profileAll";
    self.http.get(urlGetByID).subscribe(res => {
      var datas = res.json().datas;

      if (res.json().status == 100) {
        let datasContent = datas.content[0];
        self.dataItem = datas.item[0];
        self.dataEatIn = datas.eatIn[0];
        self.dataTrans = datas.trans[0];
        self.dataProfile = datas.content;

        self.field = datas.content;
        self.hasilItem = self.dataItem.totalItem / self.dataTrans.totalTrans;
        self.hasilEat = (self.dataEatIn.totalEatIn / self.dataTrans.totalTrans);
        self.totalEat = self.hasilEat.toFixed(2);
        self.totalHasilEat = self.totalEat * 100;

        self.field.kodeStore = datasContent.kodeStore;
        self.field.itemPerTransaction = self.hasilItem.toFixed(2);
        self.field.eatIn = self.totalHasilEat + "%";

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

    url = "http://localhost:8083/csg/profileSave";

    if (!self.field.nameStore) {
      self.alertDialogPost("Store Name");
    } else if (!self.field.locationStore) {
      self.alertDialogPost("Location Store");
    } else if (!self.field.storeType) {
      self.alertDialogPost("Type Store");
    } else if (!self.field.numberOfFloors) {
      self.alertDialogPost("Number Of Floors");
    } else if (!self.field.seatingCapacity) {
      self.alertDialogPost("Seating Capacity");
    } else if (!self.field.totalCrew) {
      self.alertDialogPost("Total Crew");
    } else if (!self.field.minimumCrew) {
      self.alertDialogPost("Minimum Crew");
    } else {
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
        }
      });
    }
  }

  doPostDataProcess(url) {
    let self =this;

    var dataForm = {
      "kodeStore": self.field.kodeStore,
      "namaStore": self.field.nameStore,
      "location": self.field.locationStore,
      "itemPerTransaction": self.field.itemPerTransaction,
      "storeType": self.field.storeType,
      "numberOfFloors": self.field.numberOfFloors,
      "seatingCapacity": self.field.seatingCapacity,
      "eatIn": self.field.eatIn,
      "totalCrew": self.field.totalCrew,
      "minimumCrew": self.field.minimumCrew
    }

    self.http.post(url, dataForm).map(res =>
      res.json()
    ).subscribe(result => {
      if (result.status == "0" || result.status == 0) {
        Helpers.setLoading(false);
        self.alertDialogResult(result.message);
      } else {
        Helpers.setLoading(false);
        self.router.navigate(['/profile']);
      }

    }, (err) => {
      console.log(err);
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


}
