import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeMontresShopComponent } from './liste-montres-shop.component';

describe('ListeMontresShopComponent', () => {
  let component: ListeMontresShopComponent;
  let fixture: ComponentFixture<ListeMontresShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeMontresShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeMontresShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
