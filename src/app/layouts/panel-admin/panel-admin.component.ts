import { Component ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { AppComponent } from '../../app.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ThemeServices } from '../../theme/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panel-admin',
  standalone: true,
  imports: [AppComponent,CommonModule,RouterLink,RouterOutlet,RouterLinkActive],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './panel-admin.component.html',
 
})
export class PanelAdminComponent {
  constructor(private themeService: ThemeServices) {}

  changeTheme(): void {
    this.themeService.toggleTheme();
  }



  isDropdownOpen = false;
  isDropdownOpenpedidos = false;
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  

  toggleDropdownpedidos() {
    this.isDropdownOpenpedidos = !this.isDropdownOpenpedidos;
  }
}
