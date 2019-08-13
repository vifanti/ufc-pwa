import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';

import { Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/user';

@Component({
  selector: 'app-users-novo',
  templateUrl: './users-novo.component.html',
  styleUrls: ['./users-novo.component.scss'],
  animations: [routerTransition()]
})
export class UsersNovoComponent implements OnInit {
  formUser = new FormGroup({
    nameUser: new FormControl(''),
    adminUser: new FormControl(''),
    emailUser: new FormControl(''),
  });

  isLoadingResults = false;
  constructor(private router: Router, private api: UserService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formUser = this.formBuilder.group({
      'name' : [null, Validators.required],
      'admin' : [null, Validators.required],
      'email' : [null, Validators.required],
    });
  }
  addUser(form: User) {
    this.isLoadingResults = true;
    console.log(form);
    this.isLoadingResults = false;
    // this.api.addUser(form)
    // .subscribe(res => {
    //   const id = res['id'];
    //   this.isLoadingResults = false;
    //   this.router.navigate(['/users/' + id]);
    // }, (err) => {
    //   console.log(err);
    //   this.isLoadingResults = false;
    // });
  }
}
