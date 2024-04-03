import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinFormularioComponent } from './fin-formulario.component';

describe('FinFormularioComponent', () => {
  let component: FinFormularioComponent;
  let fixture: ComponentFixture<FinFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinFormularioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
