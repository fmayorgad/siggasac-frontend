import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BankAccountsService {

  constructor(private http: HttpClient) {
  }

  create(obj) {
    return this.http
      .post(`${environment.apiUrl}/${environment.apiBaseMain}/school-bank-accounts`, obj)
      .pipe(map(response => response));
  }

  edit(name: string, code: string,id: number) {
    return this.http
      .put(`${environment.apiUrl}/${environment.apiBaseMain}/school-bank-accounts/${id}`, { name, code })
      .pipe(map(response => response));
  }

  getAll() {
    return this.http
      .get(`${environment.apiUrl}/${environment.apiBaseMain}/school-bank-accounts`)
      .pipe(map(data => data['schoolBankAccounts']));
  }
}
