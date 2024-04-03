import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoLoginUsuariosFinFormularioComponent } from './info-login-usuarios-fin-formulario.component';

describe('InfoLoginUsuariosFinFormularioComponent', () => {
  let component: InfoLoginUsuariosFinFormularioComponent;
  let fixture: ComponentFixture<InfoLoginUsuariosFinFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoLoginUsuariosFinFormularioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoLoginUsuariosFinFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
