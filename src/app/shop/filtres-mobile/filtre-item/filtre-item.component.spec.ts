import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltreItemComponent } from './filtre-item.component';

describe('FiltreItemComponent', () => {
  let component: FiltreItemComponent;
  let fixture: ComponentFixture<FiltreItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltreItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltreItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
