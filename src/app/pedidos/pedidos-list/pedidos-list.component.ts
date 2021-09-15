
import {DecimalPipe} from '@angular/common';
import {Component, QueryList, ViewChildren,OnInit, ViewChild, ElementRef} from '@angular/core';
import {Observable, EMPTY, BehaviorSubject} from 'rxjs';

import {Pedido} from '../pedidos.model';
import { Filtro } from './../../clientes/clientes.model';
import {PedidoListService} from './pedidos-list.service';
import {PedidosService} from '../pedidos.service'
import {PedidoListSortableHeader, SortEvent} from './sortable.directive';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalService} from '../../shared/alertmodal/alertmodal.service'
import { take, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'ppl-pedidos-list',
  templateUrl: './pedidos-list.component.html',
  styleUrls: [],
  providers: [PedidoListService, DecimalPipe]
})
export class PedidosListComponent implements OnInit {

  insertModalRef : BsModalRef;
  @ViewChild('template') template;
  arrFiltro : Filtro[];
  blnCriterio : Boolean = false;
  pedidos: Pedido[];
  total: number;
  currentPage = 1;
  itemsPerPage = 5;
  pageSize: number;
  blnTrouxeRegistro : boolean = false;

  @ViewChildren(PedidoListSortableHeader) headers: QueryList<PedidoListSortableHeader>;


  constructor(public service: PedidoListService,
        private modalService: BsModalService,
        private alertService: AlertModalService,
        private pedidoService : PedidosService,
        private router: Router) {
    this.pedidos = null;
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
    var f5 = new Filtro();

    f.campo = "PD.Id_Ped";
    f.desc_campo = "Pedido";
    this.arrFiltro = [f,f1,f2,f3,f4,f5];
    this.arrFiltro[0] = f;
    f1.campo = "PD.DtPed";
    f1.desc_campo = "Data";
    this.arrFiltro[1] = f1;
    f2.campo = "PD.Entrega";
    f2.desc_campo = "Entrega";
    this.arrFiltro[2] = f2;
    f3.campo = "P.Nome";
    f3.desc_campo = "Cliente";
    this.arrFiltro[3] = f3;
    f4.campo = "PD.DescrSituacao";
    f4.desc_campo = "Situação";
    this.arrFiltro[4] = f4;
    f5.campo = "PD.DescrTipo";
    f5.desc_campo = "Tipo";
    this.arrFiltro[5] = f5;

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

  ConsultarCliente(campo : HTMLInputElement, criterio : HTMLInputElement, integrado : HTMLInputElement){

    let blnIsNumeric : Boolean;
    let strCriterio : string;
    let blnIntegrado : boolean;

    console.log(Number(criterio.value));
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    blnIntegrado = integrado.checked;

    if (campo.value == "PD.Id_Ped"){
      blnIsNumeric = isNaN(Number(criterio.value))
      if (blnIsNumeric == true)
        strCriterio = "5555555555"
      else
        strCriterio = criterio.value
    }
    else
       strCriterio = criterio.value

    this.pedidoService.GetAllPedidos(campo.value,strCriterio, blnIntegrado).subscribe((es : Pedido[]) => {
      if (es.length == 0)
      {
        this.pedidos = null;
        this.total = 5;
        this.currentPage = 1;
        this.itemsPerPage = 5;
        this.pageSize
        this.alertService.showAlertDanger("Nenhum pedido encontrado") ;
      }
      else{
        console.log(es);
        this.pedidos = es
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

  ExcluirPedido(id: number){
    const result$ = this.alertService.showConfirm("Confirmação de Exclusão","Você realmente deseja excluir este pedido?","Fechar","Excluir");
    result$.asObservable()
    .pipe(
      take(1),
      switchMap(result => result ? this.pedidoService.ExcluirPedido(id) : EMPTY)
    ).subscribe(
      success => {
                   this.alertService.showAlertSuccess("Pedido excluído com sucesso");
                  //  window.location.reload();
                   this.router.navigate(['pedidos'])
                   },
      error =>  {
                this.alertService.showAlertDanger("Erro ao excluir pedido. Tente novamente") ;
                }
    )
  }

}
