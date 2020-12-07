import {Routes, RouterModule} from '@angular/router'
import { NgModule } from '@angular/core'

import {PedidosComponent} from './pedidos.component'
import {PedidosListComponent} from './pedidos-list/pedidos-list.component'
import {PedidosResolverGuard} from './guards/pedidos.resolver.guard'
import { AuthGuard } from '../guards/auth.guard'
import { DeactivateGuard } from '../guards/deactive.guard'



export const pedidoRoutes: Routes = [
    {path: 'pedido',component : PedidosComponent,resolve:{ cliente :PedidosResolverGuard},canActivate : [AuthGuard],canDeactivate : [DeactivateGuard],canLoad:[AuthGuard]},
    {path: 'pedido/:id',component : PedidosComponent,resolve:{ cliente :PedidosResolverGuard},canActivate : [AuthGuard],canDeactivate : [DeactivateGuard],canLoad:[AuthGuard]},
    {path: 'pedidos', component: PedidosListComponent,canActivate : [AuthGuard],canLoad:[AuthGuard]},
]

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(pedidoRoutes)],
  exports: [RouterModule]
})
export class PedidosRouting { }
