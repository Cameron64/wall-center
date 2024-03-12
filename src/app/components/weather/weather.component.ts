
import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  weatherData: any;
  currentTemp!: number;
  highTemp!: string;
  lowTemp!: string;
  needsJacket!: boolean;
  needsUmbrella!: boolean;

  today!: any[];

  error!: string;
  intervalId: any;

  constructor(private weatherService: WeatherService, private settingsService: SettingsService) { }

  ngOnInit() {
    this.startAutoRefresh();
    
  }

  startAutoRefresh() {
    // Initial refresh
    this.refresh();

    // Schedule refresh based on current time
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    let intervalInMilliseconds: number;

    if (currentHour >= this.settingsService.settings.activeHoursStart && currentHour < this.settingsService.settings.activeHoursEnd) {
      // Schedule refresh every 15 minutes between 6am and 9pm
      intervalInMilliseconds = this.settingsService.settings.minutesPerRefresh * 60 * 1000;
    } else {
      // Schedule refresh every hour outside of 6am to 9pm
      intervalInMilliseconds = 60 * 60 * 1000;
    }

    // Call refresh function initially, then at the scheduled intervals
    this.intervalId = setInterval(() => {
      this.refresh();
    }, intervalInMilliseconds);
  }

  stopAutoRefresh() {
    // Stop the auto-refresh interval
    clearInterval(this.intervalId);
  }

  refresh() {
    this.getWeather();
    this.getHourlyForecast();
  }

  getWeather(){
    this.weatherService.getWeather().subscribe({
      next: (data: any) => {
        this.currentTemp = data.properties.temperature.value;
      },
      error: (error: any) => {
        this.error = error.toString();
      },
      complete: () => {

      }
    });
  }

  getHourlyForecast(){
    this.weatherService.getHourlyForecast().subscribe({
      next: (data: any) => { 
        this.today = data.properties.periods.slice(0,8);
        this.needsUmbrella = this.willRain(this.today);
        this.needsJacket = this.willBeCold(this.today);
      },
      error: (error: any) => {
        this.error = error.toString();
      },
      complete: () => {
      }
    });
    }

    willRain(periods: any[]): boolean{
      return !!periods.find((period) => period.probabilityOfPrecipitation.value > this.settingsService.settings.rainPercentThreshold);
    }

    willBeCold(periods: any[]): boolean {
      return !!periods.find((period) => period.temperature < this.settingsService.settings.coldTempThreshold);
    }
}
