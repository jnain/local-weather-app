import { Component, Input, OnInit } from '@angular/core'
import { ICurrentWeather } from '../template-interfaces'
import { WeatherService } from '../weather/weather.service'

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
})
export class CurrentWeatherComponent implements OnInit {
  @Input() current: ICurrentWeather

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    // this.weatherService.currentWeather.subscribe(data => (this.current = data))
    this.weatherService
      .getCurrentWeather('Bordeaux', 'FR')
      .subscribe(data => (this.current = data))
  }
}
