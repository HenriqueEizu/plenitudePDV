import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard'
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

export const appRoutes: Routes =
[
  {path: '', component : HomeComponent},
  {path: 'login', component : LoginComponent},
  // { path: '', redirectTo : 'home', pathMatch: 'full'},
]

const routes: Routes = [];

@NgModule({
imports: [RouterModule.forRoot(routes, { useHash: true})],
exports: [RouterModule]
})
export class AppRoutingModule { }
