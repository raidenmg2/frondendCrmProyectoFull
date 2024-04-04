import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoOportunidadComponent } from './info-oportunidad.component';

describe('InfoOportunidadComponent', () => {
  let component: InfoOportunidadComponent;
  let fixture: ComponentFixture<InfoOportunidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoOportunidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoOportunidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
