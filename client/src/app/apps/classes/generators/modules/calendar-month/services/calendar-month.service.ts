import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { PdfCreatorService } from '../../../../../../core/services/pdf-creator.service';

@Injectable()
export class CalendarMonthService {

  constructor(
    private _pdfCreator: PdfCreatorService
  ) {
  }

  public generate(data: {
    month: number,
    year: number,
    outDays: string
  }) {

    const styles: any = {
      number: {
        fontSize: 92,
        margin: [0, 20, 0, 0],
        font: 'ScriptCol',
        alignment: 'center',
      },
      day: {
        fontSize: 32,
        alignment: 'center',
      }
    };

    styles.out = { color: 'red' };
    styles.in = { color: 'green' };

    const maxColumns = 4;

    const year = data.year;
    const month = data.month;

    let date = moment([year, month, 1]);
    const nbDays = date.daysInMonth();
    const outDays = [0, 3, 6];

    const f = [];
    const segments = data.outDays.split(',');
    segments.forEach((s) => {
      // tslint:disable-next-line:prefer-const
      let [start, end] = s.split('-');
      end = end || start;
      // tslint:disable-next-line:radix
      for (let t = parseInt(start); t <= parseInt(end); t++) {
        f.push(t);
      }
    });

    const widths = [];
    for (let index = 0; index < maxColumns; index++) {
      widths.push(170);
    }

    const body = [];
    let row = null;
    for (let day = 0; day < nbDays; day++) {
      if (day % maxColumns === 0) {
        if (day !== 0) {
          body.push(row);
        }
        row = [];
      }

      date = date.date(day + 1);

      const dayName = date.format('dddd').toUpperCase();

      let isOutDay = outDays.includes(date.day());
      if (f.includes(date.dates())) {
        isOutDay = true;
      }

      const stack = [
        { text: dayName, style: 'day' },
        { text: day + 1, verticalAlign: 'center', style: ['number', isOutDay ? 'out' : 'in'] },
      ];

      row.push({ stack, verticalAlign: 'center' });
    }

    if (row.length < maxColumns) {
      for (let i = maxColumns - row.length; i > 0; i--) {
        row.push('');
      }
    }

    body.push(row);

    const docDefinition: any = {
      pageOrientation: 'landscape',
      content: [
        {
          table: {
            dontBreakRows: true,
            heights: 250,
            widths,
            body,
          }
        }
      ],
      styles,
    };

    this._pdfCreator.create(docDefinition).open();
  }
}
