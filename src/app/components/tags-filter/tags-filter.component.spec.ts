import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TagsFilterComponent } from './tags-filter.component';

describe('TagsFilterComponent', () => {
  let component: TagsFilterComponent;
  let fixture: ComponentFixture<TagsFilterComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
