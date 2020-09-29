import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad{

  blnLogado : boolean;
  blnHome : boolean = false;
  constructor(private route : Router
              ) { }
  canLoad(route: Route) : Observable<boolean> | Promise<boolean> | boolean{
    return this.blnLogado;
  }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean{

    if (state.url == "/home"){
      this.blnHome = true;
    }else{
      this.blnHome = false;
    }

      if (this.VerificaLogin(this.blnHome) == false ){
          this.route.navigate(['login']);
          this.blnLogado = false;
      }

    return this.blnLogado;
 
  }

  VerificaLogin(blnHome: boolean) : boolean{
    return this.blnLogado;
  }
}
