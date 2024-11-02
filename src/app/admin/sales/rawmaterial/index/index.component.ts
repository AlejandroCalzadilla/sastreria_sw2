import { Component } from '@angular/core';
import { DashboardComponent } from "../../../dashboard/dashboard.component";
import { PanelAdminComponent } from "../../../../layouts/panel-admin/panel-admin.component";
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RawmaterialService } from '../../rawmaterial.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [PanelAdminComponent,CommonModule,RouterLink,RouterOutlet],
  templateUrl: './index.component.html',

})
export class IndexComponent {


  datas :any[] = [];
  

  constructor(private rawMaterialService: RawmaterialService) { }
  
  ngOnInit(): void {
    this.rawMaterialService.findAllRawMaterials().subscribe(response => {
      this.datas = response.data.findAllRawMaterials;
    });
  }

 


}
