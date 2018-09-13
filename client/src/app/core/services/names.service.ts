import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NamesService {

  constructor() { }

  public formatFirstname(value: string): string {
    return value.toLowerCase().split(' ').map((txt) => txt.substr(0, 1).toUpperCase() + txt.substr(1)).join(' ');
  }

  public formatLastname(value: string): string {
    return value.toUpperCase();
  }
}
