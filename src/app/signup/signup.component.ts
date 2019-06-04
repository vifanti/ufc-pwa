import { Component, OnInit, AfterViewInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Router, NavigationStart } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../shared/_helpers/must-match.validator';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [routerTransition()]
})
export class SignupComponent implements OnInit, AfterViewInit {
  private routeSub: any;
  signupForm: FormGroup;
  returnUrl: string;
  submitted = false;
  error = '';

  constructor(
    private router: Router,
    private authenticationService: AuthService,
    private formBuilder: FormBuilder,
    private api: UserService
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        admin: [true]
      },
      {
        validator: MustMatch('password', 'confirmPassword')
      }
    );

    // esconde o menu quando sair da tela de sugnup
    this.routeSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.authenticationService.hideSignup();
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.authenticationService.showSignup());
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.signupForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }

    this.api.addUser(this.signupForm.value).subscribe(
      res => {
        this.authenticationService.startSession(res);
        if (res) {
          this.router.navigate(['/']);
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
