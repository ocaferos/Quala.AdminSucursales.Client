import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Moneda } from '@app/_models/moneda';

const baseUrl = `${environment.apiUrl}Moneda/`;

@Injectable({ providedIn: 'root' })
export class MonedaService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Moneda[]>(baseUrl+'GetAll');
    }

    getById(id: number) {
        return this.http.get<Moneda>(`${baseUrl}GetById/${id}`);
    }
}