import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { LabelsFilterComponent } from './labels-filter.component';

describe('LabelsFilterComponent', () => {
  let component: LabelsFilterComponent;
  let fixture: ComponentFixture<LabelsFilterComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelsFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabelsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
