import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';

import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-users-detalhe',
  templateUrl: './users-detalhe.component.html',
  styleUrls: ['./users-detalhe.component.scss'],
  animations: [routerTransition()]
})
export class UsersDetalheComponent implements OnInit {
  user: User = { _id: '', name: '', email: '', admin: null, password: null };
  isLoadingResults = true;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private api: UserService,
    ) { }


    ngOnInit() {
      this.getUser(this.route.snapshot.params['id']);
    }

    getUser(id) {
      this.api.getUser(id)
      .subscribe(response => {
        this.user = response.data.user;
        this.isLoadingResults = false;
      });
    }

    // deleteUser(id) {
    //   this.isLoadingResults = true;
    //   this.api.deleteUser(id)
    //   .subscribe(res => {
    //     this.isLoadingResults = false;
    //     this.router.navigate(['/users']);
    //   }, (err) => {
    //     console.log(err);
    //     this.isLoadingResults = false;
    //   }
    //   );
    // }

  }

