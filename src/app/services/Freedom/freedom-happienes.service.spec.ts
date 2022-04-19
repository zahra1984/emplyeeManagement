import { TestBed } from '@angular/core/testing';

import { FreedomHappienesService } from './freedom-happienes.service';

describe('FreedomHappienesService', () => {
  let service: FreedomHappienesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FreedomHappienesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
