import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MontreItemRecapComponent } from './montre-item-recap.component';

describe('MontreItemRecapComponent', () => {
  let component: MontreItemRecapComponent;
  let fixture: ComponentFixture<MontreItemRecapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MontreItemRecapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MontreItemRecapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
