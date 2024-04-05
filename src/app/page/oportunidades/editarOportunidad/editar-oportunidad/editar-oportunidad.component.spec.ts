import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarOportunidadComponent } from './editar-oportunidad.component';

describe('EditarOportunidadComponent', () => {
  let component: EditarOportunidadComponent;
  let fixture: ComponentFixture<EditarOportunidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarOportunidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarOportunidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
