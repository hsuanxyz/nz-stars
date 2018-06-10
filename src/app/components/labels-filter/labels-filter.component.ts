import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-labels-filter',
  templateUrl: './labels-filter.component.html',
  styleUrls: ['./labels-filter.component.less']
})
export class LabelsFilterComponent {

  selectedTags: string[] = [];

  @Input() labels: string[] = [];
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
