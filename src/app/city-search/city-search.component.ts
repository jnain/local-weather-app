import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { debounceTime } from 'rxjs/operators'
import { WeatherService } from '../weather/weather.service'

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss'],
})
export class CitySearchComponent implements OnInit {
  @Output() searchEvent = new EventEmitter<string>()

  search = new FormControl('', [Validators.minLength(2)])

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.search.valueChanges.pipe(debounceTime(500)).subscribe((searchValue: string) => {
      if (!this.search.invalid && searchValue) {
        this.searchEvent.emit(searchValue)
      }
    })
  }
}
