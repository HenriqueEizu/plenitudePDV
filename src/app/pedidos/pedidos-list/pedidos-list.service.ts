import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {Pedido} from '../pedidos.model';
import {PedidosService} from '../pedidos.service';
import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap, take} from 'rxjs/operators';
import {SortColumn, SortDirection} from './sortable.directive';

interface SearchResult {
  pedidos: Pedido[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  pedidos : Observable<Pedido[]>
}

const compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(pedidos: Pedido[], column: SortColumn, direction: string): Pedido[] {
  if (direction === '' || column === '') {
    return pedidos;
  } else {
    return [...pedidos].sort((a, b) => {
      const res = compare(`${a[column]}`, `${b[column]}`);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(pedido: Pedido, term: string, pipe: PipeTransform) {
  return String(pedido.id_Ped).toLowerCase().includes(term.toLowerCase())
    || pedido.cliente.obJ_PESSOA.nome.toLowerCase().includes(term.toLowerCase())
    || String(pedido.dtPed).toLowerCase().includes(term.toLowerCase())
    || String(pedido.entrega).toLowerCase().includes(term.toLowerCase())
    || String(pedido.descrSituacao).toLowerCase().includes(term.toLowerCase())
    || String(pedido.descrTipo).toLowerCase().includes(term.toLowerCase())
}

@Injectable({providedIn: 'root'})
export class PedidoListService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _pedidos$ = new BehaviorSubject<Pedido[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  public PEDIDOS : any[];

  private _state: State = {
    page: 1,
    pageSize: 5,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
    pedidos : this._pedidos$.asObservable()
  };

  constructor(private pipe: DecimalPipe,
              private pedidoServ : PedidosService) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._pedidos$.next(result.pedidos);
      this._total$.next(result.total);
    });

    this.pedidoServ.GetAllPedidos('','',false).subscribe((es : any[]) => {
      this.PEDIDOS = es;
      console.log(this.PEDIDOS)
      this._search$.next();
    });



  }

  get pedidos$() { return this._pedidos$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pedidos$(pedidos: Observable<Pedido[]>) { this._set({pedidos});}
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {

    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    var search$ : Observable<SearchResult>;

      let pedidos = sort(this.PEDIDOS, sortColumn, sortDirection);

      // 2. filter

      pedidos = pedidos.filter(pedido => matches(pedido, searchTerm, this.pipe));
      const total = pedidos.length;

      // 3. paginate
      pedidos = pedidos.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);

      search$ = of({pedidos, total})

      return of({pedidos, total});

  }
}
