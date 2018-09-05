import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPicturePickerComponent } from './student-picture-picker.component';

describe('StudentPicturePickerComponent', () => {
  let component: StudentPicturePickerComponent;
  let fixture: ComponentFixture<StudentPicturePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentPicturePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentPicturePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
