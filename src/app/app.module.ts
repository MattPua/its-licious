import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FilterComponent } from './components/filter/filter.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { RestaurantService } from './services/restaurant.service';
import { RestaurantCardComponent } from './components/restaurant-card/restaurant-card.component';
import { CardSummaryComponent } from './components/card-summary/card-summary.component';
import { RestaurantExpandedComponent } from './components/restaurant-expanded/restaurant-expanded.component';
import { EscapeHtmlPipe } from './pipes/keep-html.pipe';
import { YelpRatingComponent } from './components/yelp-rating/yelp-rating.component';
import { SocialReviewComponent } from './components/social-review/social-review.component';
import { ContactInfoComponent } from './components/restaurant-expanded/contact-info/contact-info.component';
import { MapComponent } from './components/map/map.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FilterComponent,
    GalleryComponent,
    RestaurantCardComponent,
    CardSummaryComponent,
    RestaurantExpandedComponent,
    EscapeHtmlPipe,
    YelpRatingComponent,
    SocialReviewComponent,
    ContactInfoComponent,
    MapComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [HttpClientModule, RestaurantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
