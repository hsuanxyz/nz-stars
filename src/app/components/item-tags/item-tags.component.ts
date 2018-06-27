import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { TagsService } from '../../services/tags.service';

@Component({
  selector       : 'app-item-tags',
  templateUrl    : './item-tags.component.html',
  styleUrls      : [ './item-tags.component.less' ],
})
export class ItemTagsComponent {

  inputVisible = false;
  inputValue = '';
  _tags: string[] = [];

  @Input() id: number;
  @Input()
  set tags(value: string[]) {
    this._tags = [...value];
  }

  @ViewChild('inputElement') inputElement: ElementRef<HTMLInputElement>;

  constructor(private tagsService: TagsService) {

  }

  handleClose(removedTag: string): void {
    this.tagsService.removeTag(removedTag, this.id)
    .then(() => {
      this._tags = this._tags.filter(tag => tag !== removedTag);
    });
  }

  showInput(): void {
    this.inputVisible = true;
    setTimeout(() => {
      if (this.inputElement && this.inputElement.nativeElement) {
        this.inputElement.nativeElement.focus();
      } else {
        this.inputVisible = false;
      }
    }, 10);
  }

  handleInputConfirm(): void {
    if (!this.inputValue) {
      this.inputValue = '';
      this.inputVisible = false;
      return;
    }
    if (this._tags.indexOf(this.inputValue) === -1) {
      this.tagsService.addTag(this.inputValue, this.id)
      .then(() => {
        this._tags.push(this.inputValue);
        this.inputValue = '';
        this.inputVisible = false;
      });
    }
  }

}
