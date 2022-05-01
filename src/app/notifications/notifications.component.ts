import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  @Output() backFromNotifications: EventEmitter <boolean> = new EventEmitter;

  public backFromNoti: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  goBackFromNotifications() {
    this.backFromNotifications.emit(this.backFromNoti);
  }

}
