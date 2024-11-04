import { Component, Input, Output ,EventEmitter} from '@angular/core';


@Component({
  selector: 'app-createbutton',
  standalone: true,
  imports: [],
  templateUrl: './createbutton.component.html',

})
export class CreatebuttonComponent {
  
  @Input() label: string = 'Add new product';
  @Output() clicked = new EventEmitter<void>();

  handleClick() {
    this.clicked.emit(); // Emite el evento al hacer clic
  }

}
