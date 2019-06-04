import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';

@Component({
  selector: 'app-desenvolvedores',
  templateUrl: './desenvolvedores.component.html',
  styleUrls: ['./desenvolvedores.component.scss'],
  animations: [routerTransition()]
})
export class DesenvolvedoresComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
