import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Lutador } from '../shared/models/lutador';
import { LutadorService } from '../shared/services/lutador.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { CalculoCategoriaService } from '../shared/services/calculo-categoria.service';
import { async } from 'q';

@Component({
  selector: 'app-lutadores',
  templateUrl: './lutadores.component.html',
  styleUrls: ['./lutadores.component.scss'],
  animations: [routerTransition()]
})
export class LutadoresComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'idade', 'sexo', 'peso', 'categoriaPeso', 'paisOrigem'];
  dataSource: Lutador[];
  isLoadingResults = true;

  private pesquisaTermos = new Subject<string>();
  termo: string;
  filtroCategoria: string;

  constructor(private api: LutadorService, private calcula: CalculoCategoriaService) {}

  pesquisaTermo(termo: string, filtroCategoria: string): void {
    this.filtroCategoria = filtroCategoria;
    this.pesquisaTermos.next(termo);
  }

  preencheCategoria() {
    for (let i = 0; i < this.dataSource.length; i++) {
      this.dataSource[i].categoriaPeso = this.calcula.verificaCategoria(this.dataSource[i].peso, this.dataSource[i].sexo);
    }
  }

  ngOnInit() {
    this.api.getLutadores().subscribe(
      res => {
        this.dataSource = res;
        this.preencheCategoria();
        this.isLoadingResults = false;
      },
      err => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );

    this.pesquisaTermos
      .pipe(
        // wait 300ms after each keystroke before considering the termo
        debounceTime(300),

        // ignore new termo if same as previous termo
        // distinctUntilChanged(),

        // switch to new pesquisa observable each time the termo changes
        switchMap((termo: string) => {
          return this.api.pesquisaLutadores(termo, this.filtroCategoria);
        })
      )
      .subscribe(
        res => {
          this.dataSource = res;
          this.preencheCategoria();
          this.isLoadingResults = false;
        },
        err => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }
}
