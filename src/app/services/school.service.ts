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

  getAllSchools() {
    return this.http
      .get(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/schools`)
      .pipe(map(data => data['schools']));
  }

  getSchoolsByUserEmail(email: string) {
    return this.http
      .get(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/schools?email=${email}`)
      .pipe(map(data => data['schools']));
  }

  createSchool(obj) {
    return this.http
      .post(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/schools`,
      obj
      )
      .pipe(map(data => data['schools']));
  }

  edit(id, obj) {
    return this.http
      .put(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/schools/` + id,
      obj
      )
      .pipe();
  }
}
