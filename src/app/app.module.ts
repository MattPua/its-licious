import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FilterComponent } from './components/filter/filter.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { RestaurantService } from './services/restaurant.service';
import { RestaurantCardComponent } from './components/restaurant-card/restaurant-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FilterComponent,
    GalleryComponent,
    RestaurantCardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [HttpClientModule, RestaurantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
