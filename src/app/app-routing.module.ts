import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';

const sucursalModule = () => import('./sucursal/sucursal.module').then(x => x.SucursalModule);

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'sucursal', loadChildren: sucursalModule },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }