import { Component, EventEmitter, Output } from '@angular/core';
import { merge } from 'rxjs';

import { Tag } from '../../interfaces/repo-tags';
import { AuthService } from '../../services/auth.service';
import { TagsService } from '../../services/tags.service';

@Component({
  selector: 'app-tags-filter',
  templateUrl: './tags-filter.component.html',
  styleUrls: ['./tags-filter.component.less']
})
export class TagsFilterComponent {

  selectedTags: Tag[] = [];
  tags: Tag[] = [];
  @Output() select = new EventEmitter<Tag[]>();

  constructor(private authService: AuthService, private tagsService: TagsService) {
    merge(
      this.authService.addUser,
      this.tagsService.tagChange
    ).subscribe(() => {
      this.getTags();
    });
  }

  getTags() {
    this.tagsService.getTags()
      .then(tags => {
        this.tags = tags.tags;
      });
  }

  handleChange(checked: boolean, tag: Tag): void {
    if (checked) {
      this.selectedTags.push(tag);
    } else {
      this.selectedTags = this.selectedTags.filter(t => t !== tag);
    }
    this.select.emit(this.selectedTags);
  }

}
