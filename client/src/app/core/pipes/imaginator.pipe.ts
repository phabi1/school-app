import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imaginator'
})
export class ImaginatorPipe implements PipeTransform {

  transform(value: string, name: any): any {
    const uri = value.substr(value.indexOf('://') + 3);
    return 'http://localhost:3000/image/' + name + '/' + uri;
  }

}
