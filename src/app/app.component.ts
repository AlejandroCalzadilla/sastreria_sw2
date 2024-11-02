import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { ThemeServices } from './theme/theme.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'parcial2_sw2_cliente';
 

  constructor(public themeService: ThemeServices) {}

  ngOnInit(): void {
    initFlowbite();
   
    this.themeService.initTheme();

    const themeToggleBtn = document.getElementById('theme-toggle') as HTMLElement;

    themeToggleBtn.addEventListener('click', () => {
      this.themeService.toggleTheme();
    });
  }


  
   
}
