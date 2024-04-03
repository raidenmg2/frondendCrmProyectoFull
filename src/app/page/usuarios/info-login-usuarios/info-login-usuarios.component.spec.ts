import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoLoginUsuariosComponent } from './info-login-usuarios.component';

describe('InfoLoginUsuariosComponent', () => {
  let component: InfoLoginUsuariosComponent;
  let fixture: ComponentFixture<InfoLoginUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoLoginUsuariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoLoginUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
