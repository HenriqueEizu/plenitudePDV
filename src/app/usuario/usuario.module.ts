import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { UsuarioComponent } from './usuario.component';
import { UsuarioService } from './usuario.service';
import { UsuarioRouting } from './usuario.routing';
import { SharedModule} from  '../shared/shared.module';
// import { Usuario } from './guards/clube-deactive.guard';
// import { UsuarioResolverGuard } from './guards/clube.resolver.guard';


@NgModule({
  imports: [CommonModule, FormsModule, HttpClientModule, UsuarioRouting,SharedModule.forRoot()],
  exports: [],
  declarations: [UsuarioComponent],
  providers: [UsuarioService], //,ClubeDeactivateGuard, ClubeResolverGuard],
})
export class UsuarioModule {}

