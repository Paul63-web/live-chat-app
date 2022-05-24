import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  @Output() backFromSettings: EventEmitter<boolean> = new EventEmitter;

  public fromSettings: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  goBackFromSettings() {
    this.backFromSettings.emit(this.fromSettings);
  }

}
