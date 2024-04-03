import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoContactoUsuariosComponent } from './info-contacto-usuarios.component';

describe('InfoContactoUsuariosComponent', () => {
  let component: InfoContactoUsuariosComponent;
  let fixture: ComponentFixture<InfoContactoUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoContactoUsuariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoContactoUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
