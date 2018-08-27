import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Student } from '../../../../classes/modules/students/models/student.model';

@Injectable()
export class FirstnameLabelService {

  constructor() { }

  generate(): Observable<boolean> {

    _.assign(pdfMake, { vfs: pdfFonts.pdfMake.vfs });

    const maxColumns = 2;

    return this.getStudents().pipe(
      tap((students) => {

        const body = [];
        let row = null;
        for (let index = 0; index < students.length; index++) {

          if (!row) {
            row = [];
          }

          const student = students[index];
          row.push({ text: student.firstname.toUpperCase(), margin: 10, alignment: 'center' });

          if ((index + 1) % maxColumns === 0) {
            body.push(row);
            row = null;
          }
        }

        if (row && row.length < maxColumns) {
          for (let i = row.length; i < maxColumns; i++) {
            row.push('');
          }
          body.push(row);
        }

        const docDefinitions = {
          content: [
            {
              table: {
                widths: '*',
                body
              }
            }
          ]
        };

        pdfMake.createPdf(docDefinitions).open();
      }
      ),
      map(() => true));
  }

  private getStudents(): Observable<Student[]> {
    return of([
      {
        id: '1',
        firstname: 'fabien',
        lastname: 'Heilles'
      },
      {
        id: '2',
        firstname: 'Coralie',
        lastname: 'Hardi'
      },
      {
        id: '3',
        firstname: 'Alexis',
        lastname: 'Heilles'
      }
    ]);
  }
}
