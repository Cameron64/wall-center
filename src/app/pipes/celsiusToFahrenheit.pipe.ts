import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'celsiusToFahrenheit'
})
export class CelsiusToFahrenheitPipe implements PipeTransform {

  transform(celsius: number): number {
    return (celsius * 9 / 5) + 32;
  }

}
