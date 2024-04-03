import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCaracteristicasFisicasComponent } from './info-caracteristicas-fisicas.component';

describe('InfoCaracteristicasFisicasComponent', () => {
  let component: InfoCaracteristicasFisicasComponent;
  let fixture: ComponentFixture<InfoCaracteristicasFisicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoCaracteristicasFisicasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoCaracteristicasFisicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
