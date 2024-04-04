import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoProductoOportunidadComponent } from './info-producto-oportunidad.component';

describe('InfoProductoOportunidadComponent', () => {
  let component: InfoProductoOportunidadComponent;
  let fixture: ComponentFixture<InfoProductoOportunidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoProductoOportunidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoProductoOportunidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
