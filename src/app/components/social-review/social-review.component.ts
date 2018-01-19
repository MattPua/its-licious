import { Component, OnInit, Input } from '@angular/core';
import { YelpReview, GoogleReview, GoogleData } from '../../classes/winterlicious';
import * as moment from 'moment';
@Component({
  selector: 'app-social-review',
  templateUrl: './social-review.component.html',
  styleUrls: ['./social-review.component.scss']
})
export class SocialReviewComponent implements OnInit {
  @Input() review: (YelpReview | GoogleReview);

  constructor() { }

  ngOnInit() {
  }

  get reviewPosterType(): string {
    if (this.isYelpReview) {
      return '- Yelp Review';
    }
    else if (this.isGoogleReview) {
      return '- Google Review';
    }
  }

  get formattedDate(): string {
    return moment(this.date).fromNow();
  }

  get isYelpReview(): boolean {
    return (this.review as YelpReview).id && (this.review as YelpReview).id.length > 0;
    // return this.review.constructor.name === 'YelpReview';
  }

  get isGoogleReview(): boolean {
    return (this.review as GoogleReview).authorUrl && (this.review as GoogleReview).authorUrl.length > 0;
    // return this.review.constructor.name === 'GoogleReview';
  }

  get url(): string {
    if (this.isYelpReview) {
      return (this.review as YelpReview).url;
    }
    else if (this.isGoogleReview) {
      return 'http://www.google.ca';
    }
  }

  private get date() {
    if (this.isYelpReview) {
      return (this.review as YelpReview).timeCreated;
    }
    else if (this.isGoogleReview) {
      // Google time returns in seconds
      return (this.review as GoogleReview).time * 1000;
    }
  }

}
