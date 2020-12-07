import {DecimalPipe} from '@angular/common';
import {Component, QueryList, ViewChildren,OnInit, ViewChild} from '@angular/core';
import {Observable, EMPTY, BehaviorSubject} from 'rxjs';

import {Cliente, Filtro} from '../clientes.model';
import {ClienteListService} from './cliente-list.service';
import {ClientesService} from '../clientes.service'
import {ClienteListSortableHeader, SortEvent} from './sortable.directive';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalService} from '../../shared/alertmodal/alertmodal.service'
import { take, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'ppl-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css'],
  providers: [ClienteListService, DecimalPipe]
})
export class ClientesListComponent implements OnInit {

  insertModalRef : BsModalRef;
  @ViewChild('template') template;
  arrFiltro : Filtro[];
  blnCriterio : Boolean = false;
  clientes: Cliente[];
  total: number;
  currentPage = 1;
  itemsPerPage = 5;
  pageSize: number;
  blnTrouxeRegistro : boolean = false;

  @ViewChildren(ClienteListSortableHeader) headers: QueryList<ClienteListSortableHeader>;


  constructor(public service: ClienteListService,
        private modalService: BsModalService,
        private alertService: AlertModalService,
        private clienteService : ClientesService,
        private router: Router) {
    this.clientes = null;
    this.total = 5;
  }

  ngOnInit(): void {

    this.PopulaFiltro();

  }

  PopulaFiltro(){

    var f = new Filtro();
    var f1 = new Filtro();
    var f2 = new Filtro();
    var f3 = new Filtro();
    var f4 = new Filtro();
    f.campo = "C.ID_CLI";
    f.desc_campo = "Cliente";
    this.arrFiltro = [f,f1,f2,f3,f4];
    this.arrFiltro[0] = f;
    f1.campo = "P.CNPJCPF";
    f1.desc_campo = "CPF/CNPJ";
    this.arrFiltro[1] = f1;
    f2.campo = "P.NOME";
    f2.desc_campo = "Nome";
    this.arrFiltro[2] = f2;
    f3.campo = "P.IESTRG";
    f3.desc_campo = "Insc.Est/RG";
    this.arrFiltro[3] = f3;
    f4.campo = "Fone1";
    f4.desc_campo = "celular";
    this.arrFiltro[4] = f4;

  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage*(pageNum - 1);
  }

  public changePagesize(num: number): void {
  this.itemsPerPage = this.pageSize + num;
}



  onSort({column, direction}: SortEvent) {
    // resetting other headers

    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  onDeclineInsert(){
    this.insertModalRef.hide();
  }

  ConsultarCliente(campo : HTMLInputElement, criterio : HTMLInputElement){

    let blnIsNumeric : Boolean;
    let strCriterio : string;

    console.log(Number(criterio.value));

    if (campo.value == "C.ID_CLI"){
      blnIsNumeric = isNaN(Number(criterio.value))
      if (blnIsNumeric == true)
        strCriterio = "5555555555"
      else
        strCriterio = criterio.value
    }
    else
       strCriterio = criterio.value

    this.clienteService.GetAllClientes(campo.value,strCriterio).subscribe((es : Cliente[]) => {
      if (es[0].Id_Cli == null)
      {
        this.clientes = null;
        this.total = 5;
        this.currentPage = 1;
        this.itemsPerPage = 5;
        this.pageSize
        this.alertService.showAlertDanger("Nenhum cliente encontrado") ;
      }
      else{
        this.clientes = es
        this.total = es.length
      }
    });

  }

  AtribuiValor(criterio : string){
    if (criterio.length > 0)
      this.blnCriterio = true;
    else
      this.blnCriterio = false;
  }

  ExcluirCliente(id: number){
    const result$ = this.alertService.showConfirm("Confirmação de Exclusão","Você realmente deseja excluir esta competicao?","Fechar","Excluir");
    result$.asObservable()
    .pipe(
      take(1),
      switchMap(result => result ? this.clienteService.ExcluirCliente(id) : EMPTY)
    ).subscribe(
      success => {
                   this.alertService.showAlertSuccess("Cliente excluído com sucesso");
                  //  window.location.reload();
                   this.router.navigate(['clientes'])
                   },
      error =>  {
                this.alertService.showAlertDanger("Erro ao excluir cliente. Tente novamente") ;
                }
    )
  }

}
