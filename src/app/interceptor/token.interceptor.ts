import { UsuarioService } from './../usuario/usuario.service';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpErrorResponse } from '@angular/common/http'
import { Observable } from 'rxjs';
import {MEAT_API, MEAT_APP} from '../app.api'
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor{

  constructor(private router: Router,
              private usuarioService: UsuarioService) {

  }

    intercept(request:HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const requestUrl: Array<any> = request.url.split('/');
        const token = localStorage.getItem('token');
        const apiUrl = MEAT_API.split('/');
        var  jaLogou : string = localStorage.getItem('jaLogou');
        console.log("passou pelo intercptor")
        console.log(next)
        console.log(request)
        if (token && (requestUrl[2] === apiUrl[2])){
            const newRequest =  request.clone({ setHeaders: {'Authorization' : `Bearer ${token}`}})

            return next.handle(newRequest).pipe(tap(
              (err: any) => {
                if (err instanceof HttpErrorResponse) {
                  if (err.status === 401) {
                    this.usuarioService.loggedIn.next(false);
                    this.router.navigate(['/login'])
                  }
                }
              }
            ));
            // console.log("new request")
            // console.log(newRequest);
            //   return next.handle(newRequest).pipe(
            //     tap((event: HttpResponse<any>) => {
            //       console.log(event.status);
            //       if (event.status != undefined && event.status === 401){
            //         this.usuarioService.loggedIn.next(false);
            //         this.router.navigate(['/login'])
            //         console.log("aqui vai funcionar")
            //       }
            //     })
            //   );
        }else{
            return next.handle(request)  ;
        }
    }
}
