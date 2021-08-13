import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  //creating event to send data from Index (child) to App (parent)
  @Output() public indexEvent1 = new EventEmitter();

  constructor(private snackBar: MatSnackBar, private auth: AngularFireAuth) {}
  ngOnInit(): void {}

  //logging the state of sidenav (was not used)
  log(state: any) {
    //console.log(state);
  }

  logout() {
    //emitting data from Index (child) to App (parent) on click logout button
    //this.indexEvent1.emit(false);
    this.auth.signOut().then((res) => {
      this.indexEvent1.emit(false);
      this.snackBar.open('Logout Successful!', '', { duration: 2000 });
    });
  }
}
