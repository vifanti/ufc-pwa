import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { User } from '../shared/models/user';
import { Subject } from 'rxjs';
import { UserService } from '../shared/services/user.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [routerTransition()]
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'admin'];
  dataSource: User[];
  isLoadingResults = true;

  private pesquisaTermos = new Subject<string>();
  termo: string;

  constructor(private api: UserService) {}

  searchTerm(termo: string): void {
    this.pesquisaTermos.next(termo);
  }

  ngOnInit() {
    this.api.getUsers().subscribe(
      res => {
        this.dataSource = res;
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
        distinctUntilChanged(),

        // switch to new pesquisa observable each time the termo changes
        switchMap((termo: string) => {
          return this.api.searchUsers(termo);
        })
      )
      .subscribe(
        res => {
          this.dataSource = res;
          this.isLoadingResults = false;
        },
        err => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }
}
