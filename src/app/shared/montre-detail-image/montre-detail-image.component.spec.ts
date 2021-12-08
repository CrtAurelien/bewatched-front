import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MontreDetailImageComponent } from './montre-detail-image.component';

describe('MontreDetailImageComponent', () => {
  let component: MontreDetailImageComponent;
  let fixture: ComponentFixture<MontreDetailImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MontreDetailImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MontreDetailImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
