import { Component, OnInit, Input, EventEmitter, Output, OnChanges} from '@angular/core';
import { Restaurant } from '../../classes/winterlicious';

declare var google:any;

@Component({
  selector: 'app-restaurant-expanded',
  templateUrl: './restaurant-expanded.component.html',
  styleUrls: ['./restaurant-expanded.component.scss']
})
export class RestaurantExpandedComponent implements OnInit, OnChanges{
  @Input() restaurant: Restaurant;
  @Output() resetSelectedRestaurant: EventEmitter<void> = new EventEmitter();

  activeMenu: string;

  showProfile: boolean = true;
  showMenu: boolean = true;
  showReviews: boolean = true;

  constructor() { }

  ngOnInit() {
  }


  ngOnChanges() {
    this.activeMenu = (this.restaurant.lic_lunchmenu.length ? 'lunch' : (this.restaurant.lic_dinnermenu.length ? 'dinner' : ''));
    this._initializeGoogleMaps();
  }

  get reviews() {
    return [...this.restaurant.yelpData.reviews, ...this.restaurant.googleData.reviews];
  }

  get neighbourhoods(): string {
    let returnVal = '';
    for (const neighbourhood of this.restaurant.lic_neighbourhood) {
      returnVal += neighbourhood + ', ';
    }
    return returnVal.substring(0, returnVal.length - 2);
  }

  private _initializeGoogleMaps() {
    const position = {lat: Number.parseFloat(this.restaurant.lic_lat), lng: Number.parseFloat(this.restaurant.lic_lng)};
    const content = '<b> ' + this.restaurant.lic_restName + '</b> can be found at ' + this.restaurant.lic_address + '.';
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 17,
      center: position,
      styles: [
        {
          'elementType': 'geometry',
          'stylers': [{
            'color': '#ebe3cd'
          }]
        }, {
          'elementType': 'labels.text.fill',
          'stylers': [{
            'color': '#523735'
          }]
        }, {
          'elementType': 'labels.text.stroke',
          'stylers': [{
            'color': '#f5f1e6'
          }]
        }, {
          'featureType': 'administrative',
          'elementType': 'geometry.stroke',
          'stylers': [{
            'color': '#c9b2a6'
          }]
        }, {
          'featureType': 'administrative.land_parcel',
          'elementType': 'geometry.stroke',
          'stylers': [{
            'color': '#dcd2be'
          }]
        }, {
          'featureType': 'administrative.land_parcel',
          'elementType': 'labels.text.fill',
          'stylers': [{
            'color': '#ae9e90'
          }]
        }, {
          'featureType': 'landscape.natural',
          'elementType': 'geometry',
          'stylers': [{
            'color': '#dfd2ae'
          }]
        }, {
          'featureType': 'poi',
          'elementType': 'geometry',
          'stylers': [{
            'color': '#dfd2ae'
          }]
        }, {
          'featureType': 'poi',
          'elementType': 'labels.text.fill',
          'stylers': [{
            'color': '#93817c'
          }]
        }, {
          'featureType': 'poi.park',
          'elementType': 'geometry.fill',
          'stylers': [{
            'color': '#a5b076'
          }]
        }, {
          'featureType': 'poi.park',
          'elementType': 'labels.text.fill',
          'stylers': [{
            'color': '#447530'
          }]
        }, {
          'featureType': 'road',
          'elementType': 'geometry',
          'stylers': [{
            'color': '#f5f1e6'
          }]
        }, {
          'featureType': 'road.arterial',
          'elementType': 'geometry',
          'stylers': [{
            'color': '#fdfcf8'
          }]
        }, {
          'featureType': 'road.highway',
          'elementType': 'geometry',
          'stylers': [{
            'color': '#f8c967'
          }]
        }, {
          'featureType': 'road.highway',
          'elementType': 'geometry.stroke',
          'stylers': [{
            'color': '#e9bc62'
          }]
        }, {
          'featureType': 'road.highway.controlled_access',
          'elementType': 'geometry',
          'stylers': [{
            'color': '#e98d58'
          }]
        }, {
          'featureType': 'road.highway.controlled_access',
          'elementType': 'geometry.stroke',
          'stylers': [{
            'color': '#db8555'
          }]
        }, {
          'featureType': 'road.local',
          'elementType': 'labels.text.fill',
          'stylers': [{
            'color': '#806b63'
          }]
        }, {
          'featureType': 'transit.line',
          'elementType': 'geometry',
          'stylers': [{
            'color': '#dfd2ae'
          }]
        }, {
          'featureType': 'transit.line',
          'elementType': 'labels.text.fill',
          'stylers': [{
            'color': '#8f7d77'
          }]
        }, {
          'featureType': 'transit.line',
          'elementType': 'labels.text.stroke',
          'stylers': [{
            'color': '#ebe3cd'
          }]
        }, {
          'featureType': 'transit.station',
          'elementType': 'geometry',
          'stylers': [{
            'color': '#dfd2ae'
          }]
        }, {
          'featureType': 'water',
          'elementType': 'geometry.fill',
          'stylers': [{
            'color': '#b9d3c2'
          }]
        }, {
          'featureType': 'water',
          'elementType': 'labels.text.fill',
          'stylers': [{
            'color': '#92998d'
          }]
        }
      ],
      mapTypeControl: false

    });
    const infoWindow = new google.maps.InfoWindow({
      content: content
    });
    const marker = new google.maps.Marker({
      position: position,
      map: map,
    });
    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });
    infoWindow.open(map, marker);
  }

}
