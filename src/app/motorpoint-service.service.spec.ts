import { TestBed } from '@angular/core/testing';

import { MotorpointServiceService } from './motorpoint-service.service';

describe('MotorpointServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MotorpointServiceService = TestBed.get(MotorpointServiceService);
    expect(service).toBeTruthy();
  });
});
