import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {

  constructor(private http: HttpClient) {
  }

  getSchoolsByUserEmail(email: string) {
    return this.http
      .get(`${environment.apiUrl}/${environment.apiBaseMain}/schools?email=${email}`)
      .pipe(map(data => data['schools']));
  }
}
