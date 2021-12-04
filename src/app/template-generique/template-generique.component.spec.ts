import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateGeneriqueComponent } from './template-generique.component';

describe('TemplateGeneriqueComponent', () => {
  let component: TemplateGeneriqueComponent;
  let fixture: ComponentFixture<TemplateGeneriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateGeneriqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateGeneriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
