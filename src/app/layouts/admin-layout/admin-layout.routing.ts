import { ResultHourComponent } from './../../result-hour/result-hour.component';
import { CrewComponent } from './../../crew/crew.component';
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ProfileComponent } from '../../profile/profile.component';
import { CleanSchedulComponent } from '../../clean-schedul/clean-schedul.component';
import { CleanComponent } from '../../clean/clean.component';
import { CleanSectionComponent } from '../../clean-section/clean-section.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'crew', component: CrewComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'clean-schedul', component: CleanSchedulComponent },
    { path: 'clean', component: CleanComponent },
    { path: 'clean-section', component: CleanSectionComponent },
    { path: 'result-hour', component: ResultHourComponent },
];
