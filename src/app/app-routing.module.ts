import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import {LoginComponent} from "./login/login.component"
import { AuthGuard } from './guards/auth.guard'
import { LoginComponent } from './login/login.component';

export const appRoutes: Routes = [
  {path: '#', component : LoginComponent},
]

const routes: Routes = [];

@NgModule({
imports: [RouterModule.forRoot(routes,{useHash: true})],
exports: [RouterModule]
})
export class AppRoutingModule { }
