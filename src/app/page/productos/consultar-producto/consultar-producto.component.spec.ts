import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarProductoComponent } from './consultar-producto.component';

describe('ConsultarProductoComponent', () => {
  let component: ConsultarProductoComponent;
  let fixture: ComponentFixture<ConsultarProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarProductoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
