import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMontrePageComponent } from './detail-montre-page.component';

describe('DetailMontrePageComponent', () => {
  let component: DetailMontrePageComponent;
  let fixture: ComponentFixture<DetailMontrePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailMontrePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMontrePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
