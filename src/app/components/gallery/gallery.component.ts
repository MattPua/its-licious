import { Component, OnInit, Input } from '@angular/core';
import { Winterlicious, Restaurant } from '../../classes/winterlicious';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  @Input() winterlicious: Winterlicious;
  constructor() { }

  ngOnInit() {
  }

  get restaurants(): Restaurant[] {
    return this.winterlicious.restaurants.slice(4, 40);
  }

}
