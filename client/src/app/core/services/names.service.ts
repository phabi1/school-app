import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NamesService {

  constructor() { }

  public formatFirstname(value: string): string {
    return value;
  }

  public formatLastname(value: string): string {
    return value.toUpperCase();
  }
}
