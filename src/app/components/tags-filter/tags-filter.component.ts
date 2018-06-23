import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tags-filter',
  templateUrl: './tags-filter.component.html',
  styleUrls: ['./tags-filter.component.less']
})
export class TagsFilterComponent {

  selectedTags: string[] = [];

  @Input() tags: string[] = [];
  @Output() select = new EventEmitter<string[]>();

  handleChange(checked: boolean, tag: string): void {
    if (checked) {
      this.selectedTags.push(tag);
    } else {
      this.selectedTags = this.selectedTags.filter(t => t !== tag);
    }
    this.select.emit(this.selectedTags);
  }
}
