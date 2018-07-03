import { Component, OnInit, NgZone } from '@angular/core';
import { RestaurantService } from './services/restaurant.service';
import { Winterlicious, Restaurant } from './classes/winterlicious';
import { Filter } from './classes/filter';
import { race } from 'q';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  hasDoneInitialLoad: boolean = false;

  winterlicious: Winterlicious = new Winterlicious();
  selectedRestaurant: Restaurant = null;
  filter: Filter = new Filter();
  showMap: boolean = false;

  restaurantsToDisplay: Restaurant[] = [];

  showFilter: boolean = false;

  showAboutModal: boolean = false;
  showCreditsModal: boolean = false;

  constructor(private restaurantService: RestaurantService, private zone: NgZone) {}

  ngOnInit() {
    this.restaurantService.getRestaurants().then((r) => {
      this.winterlicious = r;
      this._getUpdatedRestaurants();
    });
  }

  onSelectCard($event: Restaurant) {
    this.zone.run(() => {
      if (this.selectedRestaurant === $event) this.selectedRestaurant = null;
      else this.selectedRestaurant = $event;
    });
  }

  onFilterChanged(filter: Filter) {
    this.filter = Object.assign(new Filter(), filter);
    this._getUpdatedRestaurants();
  }

  private _getUpdatedRestaurants() {
    if (!this.hasDoneInitialLoad && this.winterlicious.restaurants.length) this.hasDoneInitialLoad = true;

    this.restaurantsToDisplay = this.winterlicious.restaurants
    .filter((r) => {
      return this.checkFilters(r);
    })
    .sort((a, b) => {
      if (this.filter.sortBy === 'Name - Asc' || this.filter.sortBy === 'Name - Desc') return this.sortByName(a, b);
      else if (this.filter.sortBy === 'Yelp Rating - Asc'  || this.filter.sortBy === 'Yelp Rating - Desc') return this.sortByYelpRating(a, b);
    });
  }

  get restaurants(): Restaurant[] {
    return this.restaurantsToDisplay;
  }


  sortByName(a: Restaurant, b: Restaurant) {
    if (this.filter.sortBy === 'Name - Asc')  return a.lic_restName < b.lic_restName ? -1 : (a.lic_restName > b.lic_restName ? 1 : 0);
    else if (this.filter.sortBy === 'Name - Desc') return a.lic_restName < b.lic_restName ? 1 : (a.lic_restName > b.lic_restName ? -1 : 0);
  }

  sortByYelpRating(a: Restaurant, b: Restaurant) {
    if (this.filter.sortBy === 'Yelp Rating - Asc') {
      if (a.yelpData.rating < b.yelpData.rating) return -1;
      else if (a.yelpData.rating > b.yelpData.rating) return 1;
      return 0;
    }
    else if (this.filter.sortBy === 'Yelp Rating - Desc') {
      if (a.yelpData.rating < b.yelpData.rating) return 1;
      else if (a.yelpData.rating > b.yelpData.rating) return -1;
      return 0;
    }
  }

  checkFilters(r: Restaurant): boolean {
    let passNameFilter = true;
    let passNeighbourhoodFilter = true;
    let passPreferencesFilter = true;
    let passCuisinesFilter = true;
    let passAvailabilityFilter = true;
    let passRatingsFilter = true;

    if (this.filter.rating.yelp > r.yelpData.rating) {
      passRatingsFilter = false;
    }
    else if (this.filter.name && r.lic_restName.toLowerCase().indexOf(this.filter.name) < 0) {
      passNameFilter = false;
    }
    else if ((this.filter.lunch && !r.lic_lunchprice) || (this.filter.dinner && !r.lic_dinnerprice)) {
      passAvailabilityFilter = false;
    }
    // If any of the filter preferences are chosen
    else if (Object.values(this.filter.preferences).some((value) => value)) {
      if (this.filter.preferences.accessible && !r.lic_accessible) passPreferencesFilter = false;
      else if (this.filter.preferences.vegan && !r.lic_vegan) passPreferencesFilter = false;
      else if (this.filter.preferences.vegetarian && !r.lic_veggie) passPreferencesFilter = false;
      else if (this.filter.preferences.local && !r.lic_local) passPreferencesFilter = false;
    }
    else if (this.filter.cuisines.length > 0 && (!r.lic_cuisine.some((c) => this.filter.cuisines.indexOf(c) >= 0))) {
      passCuisinesFilter = false;
    }
    else if (this.filter.neighbourhoods && this.filter.neighbourhoods !== 'any' && r.lic_neighbourhood.indexOf(this.filter.neighbourhoods) < 0) {
      passNeighbourhoodFilter = false;
    }

    return passNameFilter && passNeighbourhoodFilter && passPreferencesFilter && passCuisinesFilter && passAvailabilityFilter && passRatingsFilter;
  }

}
