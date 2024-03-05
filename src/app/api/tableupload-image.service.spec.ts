import { TestBed } from '@angular/core/testing';

import { TableuploadImageService } from './tableupload-image.service';

describe('TableuploadImageService', () => {
  let service: TableuploadImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableuploadImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
