import { TestBed } from '@angular/core/testing';

import { AutenticacionService } from './autenticacion.service';

describe('AuntenticacionService', () => {
  let service: AutenticacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutenticacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
