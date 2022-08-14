import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoryItemPanierComponent } from './accessory-item-panier.component';

describe('AccessoryItemPanierComponent', () => {
  let component: AccessoryItemPanierComponent;
  let fixture: ComponentFixture<AccessoryItemPanierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessoryItemPanierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessoryItemPanierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
