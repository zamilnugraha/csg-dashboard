import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private http: Http,
  ) { }
  
  cleanTask: Observable<any[]>;
  currentDate = new Date();

  ngOnInit() {
    var url = "http://localhost:8083/csg/staff";
    this.http.get(url).subscribe(res => {
      var datas = res.json().datas;
      this.cleanTask = datas;
    });
  }

}
