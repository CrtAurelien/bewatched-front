import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltresDsktopComponent } from './filtres-dsktop.component';

describe('FiltresDsktopComponent', () => {
  let component: FiltresDsktopComponent;
  let fixture: ComponentFixture<FiltresDsktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltresDsktopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltresDsktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
