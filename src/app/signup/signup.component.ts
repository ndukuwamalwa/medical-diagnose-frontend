import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  isLoading = false;
  signUpError: string;
  form = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/[a-z' ]+/i)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  signup(form: FormGroup) {
    this.isLoading = true;
    const data: User = form.value;
    this.userService.register(data)
      .subscribe(res => {
        this.signUpError = undefined;
        this.isLoading = false;
        window.sessionStorage.setItem('key', data.password);
        this.router.navigateByUrl(`/login?username=${data.email}`);
      }, e => {
        this.isLoading = false;
        if (e.status === 409) {
          this.signUpError = `Email address has already been used.`;
        } else {
          this.signUpError = `Failed to register.`;
        }
      });
  }

}
