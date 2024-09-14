import { TestBed } from '@angular/core/testing';

import { UserServicesService } from './user-services.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { mockUserService } from '../interfaces/mockResponse';

describe('UserServicesService', () => {
  let service: UserServicesService;
  let httpMok: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserServicesService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
    service = TestBed.inject(UserServicesService);
    httpMok = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMok.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('test get getUserById', () => {
    const apiUrl = 'http://localhost:8090/customer/getCustomerId';
    const id = 23445322;
    const type = 'pasaporte';

    service.getUserById(id, type).subscribe((rest) => {
      expect(rest).toEqual(mockUserService);
    });
    const reques = httpMok.expectOne(apiUrl + `?id=${id}&type=${type}`);

    expect(reques.request.method).toBe('GET');
    reques.flush(mockUserService);
  });
});
