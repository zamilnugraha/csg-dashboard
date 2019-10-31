import { Helpers } from './../helpers';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tager-store',
  templateUrl: './target-store.component.html',
  styleUrls: ['./target-store.component.css']
})
export class TargetStoreComponent implements OnInit {
  constructor(
    private router: Router,
    private http: Http,
  ) { }

  clean: Observable<any[]>;
  field: any = {};

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

    if (self.field.typeStore = 'MS') {
      localStorage.setItem('targetSalesMS', self.field.targetSales);
      localStorage.setItem('targetTransMS', self.field.targetTransaksi);
    } else if (self.field.typeStore = 'DRT') {
      localStorage.setItem('targetSalesDRT', self.field.targetSales);
      localStorage.setItem('targetTransDRT', self.field.targetTransaksi);
    } else if (self.field.typeStore = 'HD') {
      localStorage.setItem('targetSalesHD', self.field.targetSales);
      localStorage.setItem('targetTransHD', self.field.targetTransaksi);
    } else if (self.field.typeStore = 'CSP') {
      localStorage.setItem('targetSalesCSP', self.field.targetSales);
      localStorage.setItem('targetTransCSP', self.field.targetTransaksi);
    }

    if (!self.field.targetSales) {
      self.alertDialogPost("Target Sales");
    } else if (!self.field.targetTransaksi) {
      self.alertDialogPost("Target Transaksi");
    } else if (!self.field.typeStore) {
      self.alertDialogPost("Type Store");
    } else {
      Swal.fire({
        title: 'Information',
        text: 'Are you sure to insert this data?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes'
      }).then(function (result) {
        if (result.value) {
          Helpers.setLoading(true);
          self.router.navigate(['/detail-target-store']);
        }
      });
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
