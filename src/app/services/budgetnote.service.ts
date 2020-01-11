import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class BudgetNotesService {

    constructor(private http: HttpClient) {
    }

    getAll() {
        return this.http
            .get(`${environment.apiUrl}/${environment.apiBaseMain}/budget-notes`)
            .pipe(map(data => data['budgetNotes']));
    }

    create(data) {
        return this.http
            .post(`${environment.apiUrl}/${environment.apiBaseMain}/budget-notes`, data)
            .pipe(map(response => response));
    }

}
