import { Component, OnInit, Input, EventEmitter, Output, OnChanges} from '@angular/core';
import { Restaurant } from '../../classes/winterlicious';

@Component({
  selector: 'app-restaurant-expanded',
  templateUrl: './restaurant-expanded.component.html',
  styleUrls: ['./restaurant-expanded.component.scss']
})
export class RestaurantExpandedComponent implements OnInit, OnChanges {
  @Input() restaurant: Restaurant;
  @Output() resetSelectedRestaurant: EventEmitter<void> = new EventEmitter();

  activeMenu: string;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.activeMenu = (this.restaurant.lic_lunchmenu.length ? 'lunch' : (this.restaurant.lic_dinnermenu.length ? 'dinner' : ''));
  }

  get reviews() {
    return [...this.restaurant.yelpData.reviews, ...this.restaurant.googleData.reviews];
  }

}
