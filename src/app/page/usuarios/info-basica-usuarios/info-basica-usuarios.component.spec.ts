import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBasicaUsuariosComponent } from './info-basica-usuarios.component';

describe('InfoBasicaUsuariosComponent', () => {
  let component: InfoBasicaUsuariosComponent;
  let fixture: ComponentFixture<InfoBasicaUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoBasicaUsuariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoBasicaUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
