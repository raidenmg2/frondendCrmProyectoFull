import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinOportunidadComponent } from './fin-oportunidad.component';

describe('FinOportunidadComponent', () => {
  let component: FinOportunidadComponent;
  let fixture: ComponentFixture<FinOportunidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinOportunidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinOportunidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
