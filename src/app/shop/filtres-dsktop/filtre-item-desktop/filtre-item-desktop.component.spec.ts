import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltreItemDesktopComponent } from './filtre-item-desktop.component';

describe('FiltreItemDesktopComponent', () => {
  let component: FiltreItemDesktopComponent;
  let fixture: ComponentFixture<FiltreItemDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltreItemDesktopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltreItemDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
