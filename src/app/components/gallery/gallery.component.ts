import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Winterlicious, Restaurant } from '../../classes/winterlicious';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  @Input() winterlicious: Winterlicious;
  @Input() selectedRestaurant: Restaurant;
  @Output() selectCard: EventEmitter<Restaurant> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  get restaurants(): Restaurant[] {
    return this.winterlicious.restaurants.slice(0, 40);
  }

}
