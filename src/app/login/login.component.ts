import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Input() public parentData: any;
  @Output() public loginEvent = new EventEmitter();

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  onSubmit() {
    if (
      (document.getElementById('username') as HTMLInputElement).value == 'a' &&
      (document.getElementById('password') as HTMLInputElement).value == 'a'
    ) {
      this.loginEvent.emit(true);
      this.snackBar.open('Login Successful!', '', { duration: 2000 });
    } else {
      this.snackBar.open('Incorrect Credentials!', '', { duration: 2000 });
    }
  }
}
