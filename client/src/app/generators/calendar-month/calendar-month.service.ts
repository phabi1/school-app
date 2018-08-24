import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as moment from 'moment';

@Injectable()
export class CalendarMonthService {

  constructor() {
  }

  public generate(data: {
    month: number,
    year: number,
  }) {

    _.assign(pdfMake, { vfs: pdfFonts.pdfMake.vfs });

    const styles: any = {
      number: {
        fontSize: 74,
        alignment: 'center',
      },
      day: {
        fontSize: 32,
        alignment: 'center',
      }
    };

    styles.out_number = { ...styles.number, color: 'red' };
    styles.out_day = { ...styles.day, color: 'red' };
    styles.in_number = { ...styles.number, color: 'green' };
    styles.in_day = { ...styles.day, color: 'green' };

    const maxColumns = 4;

    const year = data.year;
    const month = data.month;

    let date = moment([year, month, 1]);
    const nbDays = date.daysInMonth();
    const outDays = [0, 3, 6];

    const widths = [];
    for (let index = 0; index < maxColumns; index++) {
      widths.push('*');
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

      const dayName = date.format('dddd');

      const isOutDay = outDays.includes(date.day());

      const stack = [
        { text: day + 1, verticalAlign: 'center', style: isOutDay ? 'out_number' : 'in_number' },
        { text: dayName, style: isOutDay ? 'out_day' : 'in_day' }
      ];

      row.push({ stack, verticalAlign: 'center' });
    }

    if (row.length < maxColumns) {
      for (let i = maxColumns - row.length; i > 0; i--) {
        row.push('');
      }
    }

    body.push(row);

    const docDefinition: pdfMake.TDocumentDefinitions = {
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



    pdfMake.createPdf(docDefinition).open();
  }
}
