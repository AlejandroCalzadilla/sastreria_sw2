import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeServices { 
  private darkTheme = 'dark';
  private lightTheme = 'light';

  constructor() {
    this.initTheme();
  }

  public initTheme(): void {
    const savedTheme = localStorage.getItem('color-theme');
    if (!savedTheme || savedTheme === this.darkTheme) {
      // Si no hay tema guardado o el tema guardado es oscuro, aplicar el tema oscuro
      document.documentElement.classList.add(this.darkTheme);
      localStorage.setItem('color-theme', this.darkTheme);
    } else {
      // En cualquier otro caso, remover el tema oscuro (se asume tema claro)
      document.documentElement.classList.remove(this.darkTheme);
    }
  }
  
  public toggleTheme(): void {
    if (document.documentElement.classList.contains(this.darkTheme)) {
      // Cambiar a tema claro
      document.documentElement.classList.remove(this.darkTheme);
      localStorage.setItem('color-theme', this.lightTheme);
    } else {
      // Cambiar a tema oscuro
      document.documentElement.classList.add(this.darkTheme);
      localStorage.setItem('color-theme', this.darkTheme);
    }
  }

  public isDarkTheme(): boolean {
    return document.documentElement.classList.contains(this.darkTheme);
  }
}
