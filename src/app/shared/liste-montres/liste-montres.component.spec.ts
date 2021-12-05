import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeMontresComponent } from './liste-montres.component';

describe('ListeMontresComponent', () => {
  let component: ListeMontresComponent;
  let fixture: ComponentFixture<ListeMontresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeMontresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeMontresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
