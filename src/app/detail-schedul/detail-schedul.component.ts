import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './detail-schedul.component.html',
  styleUrls: ['./detail-schedul.component.css']
})
export class DetailScheduldComponent implements OnInit {

  constructor(
    private router: Router,
    private http: Http,
  ) { }

  cleanTask: Observable<any[]>;
  cleanTampung: any;
  currentDate = new Date();
  dataTampung: any;
  nama:any;
  URLWS: string = environment.apiEndpoint;

  ngOnInit() {
    let self = this;
    var url = self.URLWS + "/csg/detailStaff";
    self.http.get(url).subscribe(res => {
      var datas = res.json().datas;
      self.cleanTask = datas;
    });

    self.getDataCrew();
  }
  doDetailSchedul() {
    this.router.navigate(['/staff-schedul']);
  }

  getDataCrew() {
    var url = this.URLWS + "/csg/crewAll";
    this.http.get(url).subscribe(res => {
      var datas = res.json().datas;
      this.dataTampung = datas;
      for (let i = 0; i < datas.length; i++) {
        this.nama = this.dataTampung[i].nama;
      }
    });
  }

}
