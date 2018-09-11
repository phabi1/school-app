import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrombinoscopeComponent } from './trombinoscope.component';
import { Store, StoreModule } from '@ngrx/store';

describe('TrombinoscopeComponent', () => {
  let component: TrombinoscopeComponent;
  let fixture: ComponentFixture<TrombinoscopeComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ TrombinoscopeComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrombinoscopeComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
