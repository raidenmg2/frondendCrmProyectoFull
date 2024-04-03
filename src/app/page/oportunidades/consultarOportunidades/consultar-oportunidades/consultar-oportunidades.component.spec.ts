import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarOportunidadesComponent } from './consultar-oportunidades.component';

describe('ConsultarOportunidadesComponent', () => {
  let component: ConsultarOportunidadesComponent;
  let fixture: ComponentFixture<ConsultarOportunidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarOportunidadesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultarOportunidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
