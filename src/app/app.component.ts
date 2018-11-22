import { Component } from '@angular/core'
import { ICurrentWeather } from './template-interfaces'
import { WeatherService } from './weather/weather.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentWeather: ICurrentWeather
  title = 'local-weather-app'

  constructor(private weatherService: WeatherService) {
    this.currentWeather = {
      city: '',
      country: '',
      date: 0,
      image: '',
      temperature: 0,
      description: '',
    }
  }

  doSearch(searchValue) {
    const userInput = searchValue.split(',').map(s => s.trim())
    this.weatherService
      .getCurrentWeather(userInput[0], userInput.length > 1 ? userInput[1] : undefined)
      .subscribe(data => this.weatherService.currentWeather.next(data))
  }
}
