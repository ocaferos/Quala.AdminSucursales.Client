import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { SucuralService } from '@app/_services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    sucursales?: any[];

    constructor(private sucursalService: SucuralService) {}

    ngOnInit() {
        this.sucursalService.getAll()
            .pipe(first())
            .subscribe(sucursales => this.sucursales = sucursales);
            console.log(this.sucursales);
    }

    deleteSucursal(codigo: string) {
        const sucursal = this.sucursales!.find(x => x.codigo === codigo);
        sucursal.isDeleting = true;
        this.sucursalService.delete(codigo)
            .pipe(first())
            .subscribe(() => this.sucursales = this.sucursales!.filter(x => x.codigo !== codigo));
    }
}