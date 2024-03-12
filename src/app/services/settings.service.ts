import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public settings = {
    zone: "TXC453", //aka county
    forecastOfficeId: "EWX", //aka WFO
    radar: "KGRK",
    station: "KATT",
    latitude:"30.35",
    longitude: "-97.69",
    region: "srh",
    gridX: "158",
    gridY: "95",
    coldTempThreshold: 65,
    rainPercentThreshold: 30,
    activeHoursStart: 6,
    activeHoursEnd: 9,
    minutesPerRefresh: 15
  }

  constructor() { }

}
