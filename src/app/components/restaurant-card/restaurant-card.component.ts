import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Restaurant } from '../../classes/winterlicious';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.scss']
})
export class RestaurantCardComponent implements OnInit {
  @Input() restaurant: Restaurant;
  @Input() index: number;
  @Input() isSelected = false;
  @Output() selectCard: EventEmitter<Restaurant> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  get image(): string {
    return 'shttps://www.toronto.ca/ext/edc/licious/restaurant_images/' + this.restaurant.lic_imagelink;
  }

}
