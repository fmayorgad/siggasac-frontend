import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {

  constructor(private http: HttpClient) {
  }

  getBankAccountTypes() {
    return this.http
      .get(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/accounts-types`)
      .pipe(map(data => data['accountTypes']));
  }

  getPUCs() {
    return this.http
      .get(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/single-account-plan`)
      .pipe(map(data => data['singleAccountPlan']));
  }

  getDocumentNature() {
    return this.http
      .get(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/nature-documents`)
      .pipe(map(data => data['natureDocuments']));
  }

  getBudgets() {
    return this.http
      .get(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/budgets`)
      .pipe(map(data => data['budgets']));
  }

  getConcepts(id) {
    return this.http
      .get(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/budgets/${id}/concepts`)
      .pipe(map(data => data['concepts']));
  }

  getSubconcepts(id) {
    return this.http
      .get(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/budgets/concepts/${id}/subconcepts`)
      .pipe(map(data => data['subconcepts']));
  }
}
