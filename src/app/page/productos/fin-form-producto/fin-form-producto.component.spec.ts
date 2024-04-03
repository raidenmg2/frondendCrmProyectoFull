import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinFormProductoComponent } from './fin-form-producto.component';

describe('FinFormProductoComponent', () => {
  let component: FinFormProductoComponent;
  let fixture: ComponentFixture<FinFormProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinFormProductoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinFormProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
