import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErreurTechniqueComponent } from './erreur-technique.component';

describe('ErreurTechniqueComponent', () => {
  let component: ErreurTechniqueComponent;
  let fixture: ComponentFixture<ErreurTechniqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErreurTechniqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErreurTechniqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
