import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherComponent } from './components/weather/weather.component';
import { CelsiusToFahrenheitPipe } from './pipes/celsiusToFahrenheit.pipe';
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from './services/weather.service';
import { SettingsService } from './services/settings.service';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    CelsiusToFahrenheitPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    WeatherService,
    SettingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
