import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'https://api.weather.gov';
  
  constructor(private http: HttpClient, private settingsService: SettingsService) { }

  getWeather() {
    const url = `${this.apiUrl}/stations/${this.settingsService.settings.station}/observations/latest?require_qc=true`;
    return this.http.get(url); 
  }

  getForecast() {
    const url = `${this.apiUrl}/gridpoints/${this.settingsService.settings.forecastOfficeId}/${this.settingsService.settings.gridX},${this.settingsService.settings.gridY}/forecast?units=us`;
    return this.http.get(url);
  }

  getHourlyForecast() {
    const url = `${this.apiUrl}/gridpoints/${this.settingsService.settings.forecastOfficeId}/${this.settingsService.settings.gridX},${this.settingsService.settings.gridY}/forecast/hourly?units=us`;
    return this.http.get(url);
  }
}
