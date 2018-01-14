import { Component, OnInit, Input } from '@angular/core';
import { Restaurant } from '../../classes/winterlicious';

@Component({
  selector: 'app-restaurant-expanded',
  templateUrl: './restaurant-expanded.component.html',
  styleUrls: ['./restaurant-expanded.component.scss']
})
export class RestaurantExpandedComponent implements OnInit {
  @Input() restaurant: Restaurant;
  constructor() { }

  ngOnInit() {
  }

}
