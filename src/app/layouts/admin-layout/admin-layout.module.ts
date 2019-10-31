import { DetailScheduldComponent } from './../../detail-schedul/detail-schedul.component';
import { DetailTargetStoreComponent } from './../../detail-target-store/detail-target-store.component';
import { TargetStoreComponent } from './../../target-store/target-store.component';
import { StaffSchedulComponent } from './../../staff-schedul/staff-schedul.component';
import { ResultHourComponent } from './../../result-hour/result-hour.component';
import { CrewComponent } from './../../crew/crew.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ProfileComponent } from '../../profile/profile.component';
import { CleanSchedulComponent } from '../../clean-schedul/clean-schedul.component';
import { CleanComponent } from '../../clean/clean.component';
import { CleanSectionComponent } from '../../clean-section/clean-section.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { MatButtonModule, MatInputModule, MatRippleModule, MatFormFieldModule, MatTooltipModule, MatSelectModule } from '@angular/material';
import { OwlMomentDateTimeModule } from 'ng-pick-datetime-moment';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    OwlMomentDateTimeModule
  ],
  declarations: [
    DashboardComponent,
    CrewComponent,
    ProfileComponent,
    CleanSchedulComponent,
    CleanComponent,
    CleanSectionComponent,
    ResultHourComponent,
    StaffSchedulComponent,
    TargetStoreComponent,
    DetailTargetStoreComponent,
    DetailScheduldComponent
  ]
})

export class AdminLayoutModule {}
