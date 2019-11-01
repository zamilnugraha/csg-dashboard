import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';

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
  cleanTampung: any;
  currentDate = new Date();
  dataTampung :String;
  URLWS=environment.apiEndpoint;

  ngOnInit() {
    let self = this;
    var url = self.URLWS + "/csg/staff";
    self.http.get(url).subscribe(res => {
      var datas = res.json().datas;
      self.cleanTask = datas;
      
      console.log(self.cleanTask);
    });
  }

}
