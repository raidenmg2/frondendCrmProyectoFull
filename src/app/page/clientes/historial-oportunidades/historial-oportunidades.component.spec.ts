import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialOportunidadesComponent } from './historial-oportunidades.component';

describe('HistorialOportunidadesComponent', () => {
  let component: HistorialOportunidadesComponent;
  let fixture: ComponentFixture<HistorialOportunidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialOportunidadesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistorialOportunidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
