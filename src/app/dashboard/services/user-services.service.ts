import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { UserResponse } from '../interfaces/reques-responsse';
import { Observable, map, catchError, throwError, delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServicesService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8090/customer/getCustomerId';
  constructor() {}

  getUserById(id: number, typeDocument: string) {
    return this.http.get<UserResponse>(
      this.apiUrl + `?id=${id}&type=${typeDocument}`
    );
  }
}
