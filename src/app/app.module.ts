import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FilterComponent } from './components/filter/filter.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { RestaurantService } from './services/restaurant.service';
import { RestaurantCardComponent } from './components/restaurant-card/restaurant-card.component';
import { CardSummaryComponent } from './components/card-summary/card-summary.component';
import { RestaurantExpandedComponent } from './components/restaurant-expanded/restaurant-expanded.component';
import { EscapeHtmlPipe } from './pipes/keep-html.pipe';

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
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [HttpClientModule, RestaurantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
