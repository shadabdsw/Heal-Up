import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-temp',
  templateUrl: './temp.component.html',
  styleUrls: ['./temp.component.css'],
})
export class TempComponent implements OnInit {
  @Input() public parentData: any;
  @Output() public loginEvent1 = new EventEmitter();

  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  hide = true;

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  onSubmit() {
    if (
      (document.getElementById('username') as HTMLInputElement).value == 'a' &&
      (document.getElementById('password') as HTMLInputElement).value == 'a'
    ) {
      this.loginEvent1.emit(true);
      this.snackBar.open('Login Successful!', '', { duration: 2000 });
    } else {
      this.snackBar.open('Incorrect Credentials!', '', { duration: 2000 });
    }
  }
}
