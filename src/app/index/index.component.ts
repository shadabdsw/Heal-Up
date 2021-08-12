import { Component, EventEmitter, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  //creating event to send data from Index (child) to App (parent)
  @Output() public indexEvent1 = new EventEmitter();

  constructor() {}
  ngOnInit(): void {}

  //logging the state of sidenav (was not used)
  log(state: any) {
    //console.log(state);
  }

  logout() {
    //emitting data from Index (child) to App (parent) on click logout button
    this.indexEvent1.emit(false);
  }
}
