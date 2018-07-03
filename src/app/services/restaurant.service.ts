import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Winterlicious, Restaurant, GoogleReview, YelpReview } from '../classes/winterlicious';
@Injectable()
export class RestaurantService {

  constructor(private http: HttpClient) {}

  public getRestaurants(): Promise<any> {
    return this.http.get<Winterlicious>('./assets/data/current-licious.json')
    .toPromise().then((r) => {
      const winterlicious = new Winterlicious();
      winterlicious.cuisines = r.cuisines;
      winterlicious.neighbourhoods = r.neighbourhoods;
      winterlicious.restaurants = r.restaurants.map((restaurant) => {
        restaurant.googleData.reviews = restaurant.googleData.reviews.map((review) => Object.assign(new GoogleReview(), review));
        restaurant.yelpData.reviews = restaurant.yelpData.reviews.map((review) => Object.assign(new YelpReview(), review));
        restaurant.lic_accessible = restaurant.lic_accessible === 'No';
        restaurant.lic_vegan = restaurant.lic_vegan === 'No';
        restaurant.lic_veggie = restaurant.lic_veggie === 'No';
        restaurant.lic_local = restaurant.lic_local === 'No';

        return Object.assign(new Restaurant(), restaurant);
      });
      return winterlicious;
    });
  }

}
