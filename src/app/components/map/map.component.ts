import { Component, OnInit , Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { Restaurant } from '../../classes/winterlicious';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {
  @Input() restaurants: Restaurant[];
  @Input() selectedRestaurant: Restaurant;
  @Output() selectCard: EventEmitter<Restaurant> = new EventEmitter();
  constructor() { }

  map: any;
  markers = [];

  ngOnInit() {
    this._initializeGoogleMaps();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.restaurants) this._initializeMarkers();
  }

  private _initializeMarkers() {
    if (this.markers.length) {
      this.markers.forEach((m) => m.setMap(null));

      this.markers = [];
    }

    for (const restaurant of this.restaurants) {
      const markerPosition = {lat: Number.parseFloat(restaurant.lic_lat), lng: Number.parseFloat(restaurant.lic_lng)};
      const marker = new google.maps.Marker({
        position: markerPosition,
        map: this.map
      });
      marker.addListener('click', () => {
        this.markers.filter((m) => m !== marker).forEach((m) => m.setIcon());
        marker.setIcon('https://www.google.com/mapfiles/marker_orange.png');
        this.selectCard.emit(restaurant);
        this.map.panTo(marker.getPosition());
      });
      this.markers.push(marker);
    }
  }

  private _initializeGoogleMaps() {
    // Get browser location
    const position = {lat: 43.653908, lng: -79.384293};
    this.map = new google.maps.Map(document.getElementById('main-map'), {
      zoom: 14,
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
    this._initializeMarkers();

    this.map.addListener('click', () => {
      this.markers.forEach((m) => m.setIcon());
      this.selectCard.emit(null);
    });
  }

}
