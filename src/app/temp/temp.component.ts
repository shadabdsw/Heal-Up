import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-temp',
  templateUrl: './temp.component.html',
  styleUrls: ['./temp.component.css'],
})
export class TempComponent implements OnInit {
  @Output() public loginEvent1 = new EventEmitter();

  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  // email1 = (document.getElementById('email1') as HTMLInputElement).value;
  // password1 = (document.getElementById('password1') as HTMLInputElement).value;

  hide = true;

  constructor(private snackBar: MatSnackBar, private auth: AngularFireAuth) {}

  ngOnInit(): void {}

  onSubmit() {
    // if (
    //   (document.getElementById('email') as HTMLInputElement).value ==
    //     'admin' &&
    //   (document.getElementById('password') as HTMLInputElement).value == 'admin'
    // ) {
    //   this.loginEvent1.emit(true);
    //   this.snackBar.open('Login Successful!', '', { duration: 2000 });
    // } else {
    //   this.snackBar.open('Incorrect Credentials!', '', { duration: 2000 });
    // }

    this.auth
      .signInWithEmailAndPassword(this.email.value, this.password.value)
      .then((res) => {
        if (res) {
          this.loginEvent1.emit(true);
          this.snackBar.open('Login Successful!', '', { duration: 2000 });
        } else {
          this.snackBar.open('Incorrect Credentials!', '', { duration: 2000 });
        }
      });
  }
}
