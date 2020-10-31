import {Routes, RouterModule} from '@angular/router'
import { NgModule } from '@angular/core'

import {ClientesComponent} from './clientes.component'
import {ClientesListComponent} from './clientes-list/clientes-list.component'
import {ClientesResolverGuard} from './guards/clientes.resolver.guard'
import { AuthGuard } from '../guards/auth.guard'
import { DeactivateGuard } from '../guards/deactive.guard'



export const clienteRoutes: Routes = [
    {path: 'cliente',component : ClientesComponent,resolve:{ cliente :ClientesResolverGuard},canActivate : [AuthGuard],canDeactivate : [DeactivateGuard],canLoad:[AuthGuard]},
    {path: 'cliente/:id',component : ClientesComponent,resolve:{ cliente :ClientesResolverGuard},canActivate : [AuthGuard],canDeactivate : [DeactivateGuard],canLoad:[AuthGuard]},
    {path: 'clientes', component: ClientesListComponent,canActivate : [AuthGuard],canLoad:[AuthGuard]},
]

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(clienteRoutes)],
  exports: [RouterModule]
})
export class ClientesRouting { }
