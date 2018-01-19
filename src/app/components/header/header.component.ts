import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() showAboutModal: EventEmitter<void> = new EventEmitter();
  @Output() showCreditsModal: EventEmitter<void> = new EventEmitter();


  showLinksMobile: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
