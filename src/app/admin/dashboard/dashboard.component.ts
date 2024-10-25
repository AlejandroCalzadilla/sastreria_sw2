import { Component } from '@angular/core';
import { RouterOutlet, RouterPreloader } from '@angular/router';
import { PanelAdminComponent } from '../../layouts/panel-admin/panel-admin.component';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet,PanelAdminComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
       
}
