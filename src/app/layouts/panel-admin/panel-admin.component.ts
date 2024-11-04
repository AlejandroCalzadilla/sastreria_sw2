import { Component ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { AppComponent } from '../../app.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ThemeServices } from '../../theme/theme.service';

@Component({
  selector: 'app-panel-admin',
  standalone: true,
  imports: [AppComponent,RouterLink,RouterOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './panel-admin.component.html',
 
})
export class PanelAdminComponent {
  constructor(private themeService: ThemeServices) {}

  changeTheme(): void {
    this.themeService.toggleTheme();
  }
}
