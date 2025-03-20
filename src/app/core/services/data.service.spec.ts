import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService],
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch data from API', () => {
    const mockData = {
      sales: [
        { name: 'Product A', value: 120 },
        { name: 'Product B', value: 200 },
      ],
    };
    service.getData().subscribe((data) => {
      expect(data).toEqual(mockData);
    });
    const req = httpMock.expectOne('/assets/data.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});
