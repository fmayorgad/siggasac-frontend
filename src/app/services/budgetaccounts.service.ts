import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class BudgetAccountsService {

    constructor(private http: HttpClient) {
    }

    getAll() {
        return this.http
            .get(`${environment.apiUrl}/${environment.apiBaseMain}/budget-accounts`)
            .pipe(map(data => data['budgetAccounts']));
    }

    create(data) {
        return this.http
            .post(`${environment.apiUrl}/${environment.apiBaseMain}/budget-accounts`, data)
            .pipe(map(response => response));
    }

    edit(data: object, id: number) {
        return this.http
            .put(
                `${environment.apiUrl}/${environment.apiBaseMain}/budget-accounts/${id}`, data)
            .pipe(map(response => response));
    }

}
