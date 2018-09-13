import { Pipe, PipeTransform } from '@angular/core';
import { NamesService } from '../services/names.service';

@Pipe({
  name: 'fullname'
})
export class FullnamePipe implements PipeTransform {

  constructor(
    private _namesServices: NamesService
  ) { }

  transform(value: any, direction: string = 'firstname', formatted: boolean = true): any {
    let firstname = '';
    let lastname = '';
    if (Array.isArray(value)) {
      firstname = value[0];
      lastname = value[1];
    } else if (typeof (value) === 'object') {
      firstname = value.firstname;
      lastname = value.lastname;
    }

    if (formatted) {
      firstname = this._namesServices.formatFirstname(firstname);
      lastname = this._namesServices.formatLastname(lastname);
    }

    let names = [];
    switch (direction) {
      case 'firstname_lastname':
        names = [firstname, lastname];
        break;
      case 'lastname_firstname':
        names = [lastname, firstname];
        break;
    }

    return names.join(' ');
  }

}
