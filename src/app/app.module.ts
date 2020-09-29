import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { HttpClientModule, HttpClient , HTTP_INTERCEPTORS} from '@angular/common/http';
import {CommonModule} from '@angular/common'
import {LOCALE_ID} from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localePt);
import { RouterModule,PreloadAllModules } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalModule} from 'ngx-bootstrap/modal';
import { AuthGuard } from './guards/auth.guard';
import { DeactivateGuard } from './guards/deactive.guard';
import { TokenInterceptor } from './interceptor/token.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule} from  './shared/shared.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule, 
    CommonModule,
    // RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules}),
    FontAwesomeModule,
    HttpClientModule,
    ModalModule.forRoot(),
    SharedModule.forRoot(),
    AppRoutingModule,
    // DashboardModule,
  ],
  providers: [{provide: LOCALE_ID, useValue:'pt-BR'}, AuthGuard,DeactivateGuard,
              { provide: HTTP_INTERCEPTORS,
                useClass: TokenInterceptor,
                multi: true,
              }
  // ,ClubeService, UsuarioService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
