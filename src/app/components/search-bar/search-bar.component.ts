import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.less']
})
export class SearchBarComponent {
  term: string;

  @Output() search = new EventEmitter<string>();
  @Output() clear = new EventEmitter<void>();

  onClear(): void{
    this.term = null;
    this.clear.emit()
  }

  onSearch(value: string): void {
    this.term = value;
    this.search.emit(value);
  }
}
