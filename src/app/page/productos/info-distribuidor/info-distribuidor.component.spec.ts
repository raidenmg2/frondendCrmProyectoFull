import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDistribuidorComponent } from './info-distribuidor.component';

describe('InfoDistribuidorComponent', () => {
  let component: InfoDistribuidorComponent;
  let fixture: ComponentFixture<InfoDistribuidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoDistribuidorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoDistribuidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
