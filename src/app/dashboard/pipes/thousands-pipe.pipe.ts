import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousandsPipe',
  standalone: true,
})
export class ThousandsPipePipe implements PipeTransform {
  public transform(value: any) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
}
