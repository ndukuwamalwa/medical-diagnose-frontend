import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  loginError: string;
  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        if (!params || !params.username) {
          return;
        }
        const pass = window.sessionStorage.getItem('key');
        if (!pass) {
          return;
        }
        this.form.setValue({
          username: params.username,
          password: pass
        });
        return this.login(this.form);
      });
  }

  login(form: FormGroup): void {
    this.isLoading = true;
    const value = form.value;
    const username: string = value.username;
    const password: string = value.password;
    this.authService.login(username, password)
      .subscribe(res => {
        this.isLoading = false;
        this.loginError = undefined;
        this.authService.setToken(res.token);
        this.router.navigate(['account', 'diagnose']);
      }, e => {
        this.isLoading = false;
        if (e.status === 401) {
          this.loginError = `Invalid username or password.`;
        } else {
          this.loginError = `Problem loging in.`;
        }
      });
  }

}
