import {Routes, RouterModule} from '@angular/router'
import { NgModule } from '@angular/core'

import {GridExtremeComponent} from './grid-extreme.component'
// import {UsuarioListComponent} from './usuario-list/usuario-list.component'
import { AuthGuard } from '../guards/auth.guard'
import { DeactivateGuard } from '../guards/deactive.guard'



export const gridRoutes: Routes = [
    // {path: 'usuario', component: UsuarioComponent,resolve:{usuario :UsuarioResolverGuard},canActivate : [AuthGuard], canDeactivate : [DeactivateGuard], canLoad:[AuthGuard]},
    {path: 'grid', component: GridExtremeComponent},
    // {path: 'usuario/:id',component : UsuarioComponent,resolve:{ usuario :UsuarioResolverGuard},canActivate : [AuthGuard],canDeactivate : [DeactivateGuard],canLoad:[AuthGuard]},
    // {path: 'listausuarios', component: UsuarioListComponent,canActivate : [AuthGuard],canLoad:[AuthGuard]},
    // {path: 'usuarioInicial', component: UsuarioComponent},
    // {path: 'TrocaSenha/:id', component: TrocaSenhaComponent},
]

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(gridRoutes)],
  exports: [RouterModule]
})
export class GridExtremeRouting { }
