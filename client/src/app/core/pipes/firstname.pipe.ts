import { Pipe, PipeTransform } from '@angular/core';
import { NamesService } from '../services/names.service';

@Pipe({
  name: 'firstname'
})
export class FirstnamePipe implements PipeTransform {

  constructor(private _namesService: NamesService) { }

  transform(value: any, args?: any): any {
    return this._namesService.formatFirstname(value);
  }

}
