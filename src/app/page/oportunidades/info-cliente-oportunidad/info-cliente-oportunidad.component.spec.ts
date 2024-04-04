import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoClienteOportunidadComponent } from './info-cliente-oportunidad.component';

describe('InfoClienteOportunidadComponent', () => {
  let component: InfoClienteOportunidadComponent;
  let fixture: ComponentFixture<InfoClienteOportunidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoClienteOportunidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoClienteOportunidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
