import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Component({
  selector: 'ppl-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'chutesfutmesa';
  isLoggedIn$: Observable<boolean>;
  blnLogado : boolean = false;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.isLoggedIn.subscribe((bl : boolean) => { this.blnLogado = bl});
  }

}
