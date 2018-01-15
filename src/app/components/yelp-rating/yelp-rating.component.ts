import { Component, OnInit, Input } from '@angular/core';
import { YelpData } from '../../classes/winterlicious';

@Component({
  selector: 'app-yelp-rating',
  templateUrl: './yelp-rating.component.html',
  styleUrls: ['./yelp-rating.component.scss']
})
export class YelpRatingComponent implements OnInit {
  @Input() yelpData: YelpData;

  // If no yelpData provided use this
  @Input() reviewRating: number;
  @Input() showFullDetails = true;
  constructor() { }

  ngOnInit() {
  }

  get rating(): number {
    return this.reviewRating ? this.reviewRating : this.yelpData.rating;
  }

}
