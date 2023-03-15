import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Sucursal } from '@app/_models';
import { Response } from '@app/_models/response';


const baseUrl = `${environment.apiUrl}Sucursal/`;

@Injectable({ providedIn: 'root' })
export class SucuralService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Sucursal[]>(baseUrl+'GetAll');
    }

    getById(id: number) {
        return this.http.get<Response>(`${baseUrl}GetById/${id}`);
    }

    create(params: any) {
        return this.http.post(baseUrl+'Insert', params);
    }

    update(params: any) {
        return this.http.put(`${baseUrl}Update`, params);
    }

    delete(id: string) {
        return this.http.delete(`${baseUrl}Delete/${id}`);
    }
}