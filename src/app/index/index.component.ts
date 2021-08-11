import { Component, EventEmitter, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  @Output() public indexEvent = new EventEmitter();

  constructor() {}
  ngOnInit(): void {}

  log(state: any) {
    console.log(state);

    if (state == 'Opened') {
    } else {
    }
  }

  logout() {
    this.indexEvent.emit(false);
  }
}
