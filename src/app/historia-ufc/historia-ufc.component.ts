import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';

@Component({
  selector: 'app-historia-ufc',
  templateUrl: './historia-ufc.component.html',
  styleUrls: ['./historia-ufc.component.scss'],
  animations: [routerTransition()]
})
export class HistoriaUfcComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
