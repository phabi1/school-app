import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sex'
})
export class SexPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
      case 'MALE':
        return 'Garçon';

      case 'FEMALE':
        return 'Fille';
      default:
        return '';
    }
  }

}
