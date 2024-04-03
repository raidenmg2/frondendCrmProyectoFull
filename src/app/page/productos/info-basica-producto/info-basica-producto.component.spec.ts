import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBasicaProductoComponent } from './info-basica-producto.component';

describe('InfoBasicaProductoComponent', () => {
  let component: InfoBasicaProductoComponent;
  let fixture: ComponentFixture<InfoBasicaProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoBasicaProductoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoBasicaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
