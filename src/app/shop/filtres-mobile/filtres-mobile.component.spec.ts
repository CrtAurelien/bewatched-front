import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltresMobileComponent } from './filtres-mobile.component';

describe('FiltresMobileComponent', () => {
  let component: FiltresMobileComponent;
  let fixture: ComponentFixture<FiltresMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltresMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltresMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
