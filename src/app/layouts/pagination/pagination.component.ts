import { Component,EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 10;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  @Input() totalItems: number = 0;
Math: any;
  goToPrevious() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChange.emit(this.currentPage);
    }
  }

  goToNext() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.pageChange.emit(this.currentPage);
    }
  }

  goToPage(page: number | string) {
    if (typeof page === 'number') {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
    }
  }

  /* updateItems() {
    this.startItem = (this.currentPage - 1) * 10 + 1;
    this.endItem = Math.min(this.startItem + 9, this.totalItems);
  } */
}