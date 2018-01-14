import { Component, OnInit } from '@angular/core';
import { RestaurantService } from './services/restaurant.service';
import { Winterlicious } from './classes/winterlicious';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app';
  winterlicious: Winterlicious = new Winterlicious();

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit() {
    this.restaurantService.getRestaurants().then((r) => this.winterlicious = r);
  }
}
