import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemTagsComponent } from './item-tags.component';

describe('ItemTagsComponent', () => {
  let component: ItemTagsComponent;
  let fixture: ComponentFixture<ItemTagsComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemTagsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
