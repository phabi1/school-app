import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocGroupComponent } from './bloc-group.component';

describe('BlocGroupComponent', () => {
  let component: BlocGroupComponent;
  let fixture: ComponentFixture<BlocGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlocGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
