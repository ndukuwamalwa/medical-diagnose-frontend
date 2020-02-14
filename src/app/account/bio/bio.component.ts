import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.scss']
})
export class BioComponent implements OnInit {
  isLoading = false;
  updateError: string;
  form = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/[a-z' ]+/i)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    const data = this.userService.info();
    this.form.setValue({
      name: data.name,
      email: data.email,
      password: ''
    });
  }

  update(form: FormGroup) {
    this.isLoading = true;
    this.userService.update(form.value)
      .subscribe(res => {
        this.isLoading = false;
        this.updateError = undefined;
      }, e => {
        this.isLoading = false;
        if (e.status === 409) {
          this.updateError = `Email address belongs to another user.`;
        } else {
          this.updateError = `Failed to update your details. Please retry.`;
        }
      });
  }

}
