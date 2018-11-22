import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { environment } from '../../environments/environment'
import { ICurrentWeather } from '../template-interfaces'

export interface IWeatherService {
  getCurrentWeatherByCoords(coords: Coordinates): Observable<ICurrentWeather>
  getCurrentWeather(
    search: string | number,
    country?: string
  ): Observable<ICurrentWeather>
}
interface ICurrentWeatherData {
  weather: [
    {
      description: string
      icon: string
    }
  ]
  main: {
    temp: number
  }
  sys: {
    country: string
  }
  dt: number
  name: string
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService implements IWeatherService {
  constructor(private httpClient: HttpClient) {}

  private transformToICurrentWeather(data: ICurrentWeatherData): ICurrentWeather {
    return {
      city: data.name,
      country: data.sys.country,
      date: data.dt * 1000,
      image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      temperature: data.main.temp - 273.15,
      description: data.weather[0].description,
    }
  }

  getCurrentWeatherByCoords(coords: Coordinates): Observable<ICurrentWeather> {
    const uriParams = `lat=${coords.latitude}&lon=${coords.longitude}`
    return this.getCurrentWeatherHelper(uriParams)
  }

  getCurrentWeather(
    search: string | number,
    country?: string
  ): Observable<ICurrentWeather> {
    let uriParams = ''
    if (typeof search === 'string') {
      uriParams = `q=${search}`
    } else {
      uriParams = `zip=${search}`
    }

    if (country) {
      uriParams = `${uriParams},${country}`
    }

    return this.getCurrentWeatherHelper(uriParams)
  }

  private getCurrentWeatherHelper(uriParams: string): Observable<ICurrentWeather> {
    return this.httpClient
      .get<ICurrentWeatherData>(
        `${environment.baseUrl}api.openweathermap.org/data/2.5/weather?` +
          `${uriParams}&appid=${environment.appId}`
      )
      .pipe(map(data => this.transformToICurrentWeather(data)))
  }
}
