import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { SucuralService, AlertService } from '@app/_services';
import { MonedaService } from '@app/_services/moneda.service';
import { MustMatch } from '@app/_helpers';
import { getLocaleDateFormat } from '@angular/common';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form!: FormGroup;
    id?: number;
    title!: string;
    loading = false;
    submitting = false;
    submitted = false;
    tipos = [
        { id: 1, texto: "COP" },
        { id: 2, texto: "USD"},
        { id: 3, texto: "EUR"}
      ];
      monedaList?: any[];

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private sucursalService: SucuralService,
        private monedaService: MonedaService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['codigo'];
        
        this.form = this.formBuilder.group({
            codigo: [],
            descripcion: ['', Validators.required],
            direccion: ['', Validators.required],
            identificacion: ['', Validators.required],
            fecha_Creacion: [],
            codigo_Moneda: []
        }, {
            validators: MustMatch('password', 'confirmPassword')
        });

        this.monedaService.getAll()
            .pipe(first())
            .subscribe(monedas => this.monedaList = monedas);

        this.title = 'Add Sucursal';
        if (this.id) {
            // edit mode
            this.title = 'Edit Sucursal';
            this.loading = true;
            this.sucursalService.getById(this.id)
                .pipe(first())
                .subscribe(x => {
                    this.form.patchValue(x);
                    this.loading = false;
                });
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        if (this.form.value.codigo == null){
            this.form.value.codigo = 0;
        }

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.submitting = true;
        this.saveSucursal()
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Sucursal saved', { keepAfterRouteChange: true });
                    this.router.navigateByUrl('/sucursal');
                },
                error: error => {
                    this.alertService.error(error);
                    this.submitting = false;
                }
            })
    }

    private saveSucursal() {
        return this.id
            ? this.sucursalService.update(this.form.value)
            : this.sucursalService.create(this.form.value);
    }
}