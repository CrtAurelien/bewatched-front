import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MontreItemComponent } from './montre-item.component';

describe('MontreItemComponent', () => {
  let component: MontreItemComponent;
  let fixture: ComponentFixture<MontreItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MontreItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MontreItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
