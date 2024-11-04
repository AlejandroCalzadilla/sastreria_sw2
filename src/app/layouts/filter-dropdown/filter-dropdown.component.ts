import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';



interface Brand {
  id: string;
  name: string;
  count: number;
  selected: boolean;
}

@Component({
  selector: 'app-filter-dropdown',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './filter-dropdown.component.html',
  
})
export class FilterDropdownComponent {

  @Input() brands: any[] = [];
   dropdownVisible: boolean = false;
 
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  onBrandSelect(brand: any) {
    console.log(`${brand.name} selected: ${brand.selected}`);
  }


}
