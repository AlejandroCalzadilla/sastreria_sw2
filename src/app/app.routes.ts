import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PanelAdminComponent } from './layouts/panel-admin/panel-admin.component';

import { IndexComponent } from './admin/purchases/rawmaterial/index/index.component';
import { CustomerindexComponent } from './admin/purchases/customer/customerindex/customerindex.component';
import { StoreindexComponent } from './admin/purchases/store/storeindex/storeindex.component';
import { NoteIndexComponent } from './admin/purchases/purchase_note/note-index/note-index.component';
import { HomeComponent } from './layouts/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { PedidosindexComponent } from './admin/orders/pedido/pedidosindex/pedidosindex.component';
import { PedidoscreateComponent } from './admin/orders/pedido/pedidoscreate/pedidoscreate.component';
import { VestimentaindexComponent } from './admin/orders/vestimenta/vestimentaindex/vestimentaindex.component';
import { DashboardComponent } from './admin/dashboards/dashboard/dashboard.component';



export const routes: Routes = [

    { path: '', component: HomeComponent },
    { path: 'admin', component: PanelAdminComponent },
    { path: 'dash', component: DashboardComponent },
    { path: 'login', component: LoginComponent },





      //rawmaterial

     { path: 'rawmaterials/index', component:IndexComponent },
     { path: 'rawmaterials/create', component:IndexComponent },
     { path: 'rawmaterials/edit', component:IndexComponent },
    

     { path: 'customers/index', component:CustomerindexComponent },
     
     { path: 'stores/index', component:StoreindexComponent },
       

     { path: 'purchase_note/index', component:NoteIndexComponent },
      


     {path: 'pedido/index', component:PedidosindexComponent},
     {path: 'pedido/create', component:PedidoscreateComponent},
     

     {path: 'vestimenta/index', component:VestimentaindexComponent},
     

];
