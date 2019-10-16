import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: ''},
    { path: '/crew', title: 'Crew',  icon:'person', class: '' },
    { path: '/clean', title: 'Clean',  icon:'bubble_chart', class: '' },
    { path: '/profile', title: 'Profile Store',  icon:'business', class: '' },
    { path: '/clean-section', title: 'Section',  icon:'library_books', class: '' },
    { path: '/clean-schedul', title: 'Clean Schedul',  icon:'assignment', class: '' },
    { path: '/result-hour', title: 'Result By Hour',  icon:'menu_book', class: '' },
    { path: '/staff-schedul', title: 'Staff Schedul',  icon:'date_range', class: '' },
    { path: '/target-store', title: 'Target Store',  icon:'assessment', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
