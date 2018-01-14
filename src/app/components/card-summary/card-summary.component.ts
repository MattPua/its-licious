import { Component, OnInit, Input } from '@angular/core';
import { Restaurant } from '../../classes/winterlicious';

@Component({
  selector: 'app-card-summary',
  templateUrl: './card-summary.component.html',
  styleUrls: ['./card-summary.component.scss']
})
export class CardSummaryComponent implements OnInit {
  @Input() restaurant: Restaurant;

  constructor() { }

  ngOnInit() {
  }

}
