import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MontreItemPanierComponent } from './montre-item-panier.component';

describe('MontreItemPanierComponent', () => {
  let component: MontreItemPanierComponent;
  let fixture: ComponentFixture<MontreItemPanierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MontreItemPanierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MontreItemPanierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
