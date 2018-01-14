import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Winterlicious, Restaurant } from '../classes/winterlicious';
@Injectable()
export class RestaurantService {

  constructor(private http: HttpClient) {}

  public getRestaurants(): Promise<any> {
    return this.http.get<Winterlicious>('./assets/data/winterlicious.json')
    .toPromise().then((r) => {
      const winterlicious = new Winterlicious();
      winterlicious.cuisines = r.cuisines;
      winterlicious.neighbourhoods = r.neighbourhoods;
      winterlicious.restaurants = r.restaurants.map((restaurant) => Object.assign(new Restaurant(), restaurant));
      console.log(winterlicious);
      return winterlicious;
    });
  }

}
