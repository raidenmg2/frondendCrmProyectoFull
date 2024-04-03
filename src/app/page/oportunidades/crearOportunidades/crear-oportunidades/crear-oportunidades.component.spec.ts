import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearOportunidadesComponent } from './crear-oportunidades.component';

describe('CrearOportunidadesComponent', () => {
  let component: CrearOportunidadesComponent;
  let fixture: ComponentFixture<CrearOportunidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearOportunidadesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearOportunidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
