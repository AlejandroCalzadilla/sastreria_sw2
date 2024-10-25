import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PanelAdminComponent } from './layouts/panel-admin/panel-admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';

export const routes: Routes = [

    { path: '', component: AppComponent },
    { path: 'admin', component: PanelAdminComponent },
    { path: 'dashboard', component: DashboardComponent }
    
];
