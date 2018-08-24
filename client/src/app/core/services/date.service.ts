import { Injectable } from '@angular/core';
import * as moment from 'moment';

interface NumberOption {
  data: number;
  label: string;
}

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  getMonthOptions(): NumberOption[] {
    const options = [];
    for (let month = 0; month < 12; month++) {
      options.push({ data: month, label: moment().month(month).format('MMMM') });
    }
    return options;
  }
}
