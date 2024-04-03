import { TestBed } from '@angular/core/testing';

import { AuntenticacionService } from './autenticacion.service';

describe('AuntenticacionService', () => {
  let service: AuntenticacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuntenticacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
