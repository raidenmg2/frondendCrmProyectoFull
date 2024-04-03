import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCaracteristicasTecnicasComponent } from './info-caracteristicas-tecnicas.component';

describe('InfoCaracteristicasTecnicasComponent', () => {
  let component: InfoCaracteristicasTecnicasComponent;
  let fixture: ComponentFixture<InfoCaracteristicasTecnicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoCaracteristicasTecnicasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoCaracteristicasTecnicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
