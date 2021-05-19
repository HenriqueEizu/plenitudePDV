import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {Cliente} from '../clientes.model';
import {ClientesService} from '../clientes.service';
import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap, take} from 'rxjs/operators';
import {SortColumn, SortDirection} from './sortable.directive';

interface SearchResult {
  clientes: Cliente[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  clientes : Observable<Cliente[]>
}

const compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(clientes: Cliente[], column: SortColumn, direction: string): Cliente[] {
  if (direction === '' || column === '') {
    return clientes;
  } else {
    return [...clientes].sort((a, b) => {
      const res = compare(`${a[column]}`, `${b[column]}`);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(cliente: Cliente, term: string, pipe: PipeTransform) {
  return String(cliente.id_Cli).toLowerCase().includes(term.toLowerCase())
    || cliente.obJ_PESSOA.nome.toLowerCase().includes(term.toLowerCase())
    || cliente.obJ_PESSOA.cnpjCpf.toLowerCase().includes(term.toLowerCase())
    || cliente.obJ_PESSOA.iEstRG.toLowerCase().includes(term.toLowerCase())
    || cliente.obJ_PESSOA.indFisJur.toLowerCase().includes(term.toLowerCase())
}

@Injectable({providedIn: 'root'})
export class ClienteListService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _clientes$ = new BehaviorSubject<Cliente[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  public CLIENTES : any[];

  private _state: State = {
    page: 1,
    pageSize: 5,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
    clientes : this._clientes$.asObservable()
  };

  constructor(private pipe: DecimalPipe,
              private clienteServ : ClientesService) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._clientes$.next(result.clientes);
      this._total$.next(result.total);
    });

    this.clienteServ.GetAllClientes('','').subscribe((es : any[]) => {
      this.CLIENTES = es;
      this._search$.next();
    });



  }

  get clientes$() { return this._clientes$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set clientes$(clientes: Observable<Cliente[]>) { this._set({clientes});}
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

      let clientes = sort(this.CLIENTES, sortColumn, sortDirection);

      // 2. filter

      clientes = clientes.filter(cliente => matches(cliente, searchTerm, this.pipe));
      const total = clientes.length;

      // 3. paginate
      clientes = clientes.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);

      search$ = of({clientes, total})

      return of({clientes, total});

  }
}
