import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { Restaurant } from '../../classes/winterlicious';

@Component({
  selector: 'app-restaurant-expanded',
  templateUrl: './restaurant-expanded.component.html',
  styleUrls: ['./restaurant-expanded.component.scss']
})
export class RestaurantExpandedComponent implements OnInit {
  @Input() restaurant: Restaurant;
  @Output() resetSelectedRestaurant: EventEmitter<void> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  get reviews() {
    return [...this.restaurant.yelpData.reviews, ...this.restaurant.googleData.reviews];
  }

}
