import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PanelAdminComponent } from './layouts/panel-admin/panel-admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { IndexComponent } from './admin/sales/rawmaterial/index/index.component';



export const routes: Routes = [

    { path: '', component: AppComponent },
    { path: 'admin', component: PanelAdminComponent },
    { path: 'dashboard', component: DashboardComponent },




      //rawmaterial

     { path: 'rawmaterials/index', component:IndexComponent },
     { path: 'rawmaterials/create', component:IndexComponent },
     { path: 'rawmaterials/edit', component:IndexComponent }
    






];
