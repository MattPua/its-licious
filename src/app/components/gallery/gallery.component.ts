import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Restaurant } from '../../classes/winterlicious';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  @Input() restaurants: Restaurant[];
  @Input() selectedRestaurant: Restaurant;
  @Output() selectCard: EventEmitter<Restaurant> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
