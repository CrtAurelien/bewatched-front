import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosLivraisonComponent } from './infos-livraison.component';

describe('InfosLivraisonComponent', () => {
  let component: InfosLivraisonComponent;
  let fixture: ComponentFixture<InfosLivraisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfosLivraisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfosLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
