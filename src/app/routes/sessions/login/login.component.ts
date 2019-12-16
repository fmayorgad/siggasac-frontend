import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthenticationService, SchoolService } from '../../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  isSchool: boolean = false;

  schools: [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private schoolService: SchoolService,
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      schoolId: ['', [Validators.required]],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = /*this.route.snapshot.queryParams['returnUrl'] ||*/ '/';

  }

  ngOnInit() {

  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;

    // reset alerts on submit
    // this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.authenticationService.login(
      this.f.username.value,
      this.f.password.value,
      this.f.schoolId.value,
    )
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          // this.alertService.error(error);
          this.loading = false;
        });
  }

  getSchoolsByUserEmail() {
    this.schoolService
      .getSchoolsByUserEmail(`${this.f.username.value}`)
      .subscribe(data => {
        this.schools = data;
        this.isSchool = true;
      });
  }
}
