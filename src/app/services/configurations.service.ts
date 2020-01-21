import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationsService {

  constructor(private http: HttpClient) {
  }

  savePermissions(obj, id) {
    return this.http
      .post(`${environment.apiUrl}/${environment.apiBaseMain.configuration}/${environment.versions.v1}/permissions/${id}`,{data:obj} )
      .pipe(map(response => response));
  }

}
