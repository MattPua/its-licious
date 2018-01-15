export class Winterlicious {
  cuisines: string[] = [];
  neighbourhoods: string[] = [];
  restaurants: Restaurant[] = [];
}

export class Restaurant {
  lic_address: string;
  lic_lunch: string;
  lic_dinnermenu: string[] = [];
  lic_dinner: string;
  lic_twit: string;
  lic_lunchlink: string;
  lic_dinnerlink: string;
  lic_local: string;
  lic_neighbourhood: string[] = [];
  lic_youtube: string;
  lic_cuisine: string[] = [];
  lic_veggie: string;
  lic_search_name: string;
  lic_dinnerprice: string;
  lic_imagelink: string;
  lic_fb: string;
  lic_url: string;
  lic_phone: string;
  lic_profile: string[];
  lic_new: string;
  lic_lng: number;
  lic_restName: string;
  lic_postal: string;
  lic_vegan: string;
  lic_lunchprice: string;
  lic_mobilelink: string;
  lic_instagram: string;
  lic_accessible: string;
  lic_lat: number;
  lic_lunchmenu: string[] = [];
  lic_additionaladdress: string;


  yelpData: YelpData;
  googleData: GoogleData;

  _displayPrice: string;
  get displayPrice(): string {
    if (this.lic_lunchprice && this.lic_dinnerprice) {
      return `${this.lic_lunchprice} | ${this.lic_dinnerprice}`;
    }
    else if (this.lic_lunchprice && !this.lic_dinnerprice) {
      return this.lic_lunchprice;
    }
    else if (!this.lic_lunchprice && this.lic_dinnerprice) {
      return this.lic_dinnerprice;
    }
    else return '';
  }
}

export class YelpReview {
  constructor() {}
  id: string;
  text: string;
  url: string;
  rating: number;
  timeCreated: string;
}

export class GoogleReview {
  constructor() {}
  authorUrl: string;
  rating: number;
  time: number;
  text: string;
}

export class YelpData {
  yelpId: string;
  imageUrl: string;
  photos: string[];
  rating: number;
  reviewCount: number;
  yelpUrl: string;
  reviews: YelpReview[];
}
export class GoogleData {
  googlePlaceId: string;
  rating: number;
  reviews: GoogleReview[];
  url: string;
}
