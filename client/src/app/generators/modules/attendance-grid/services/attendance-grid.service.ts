import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { PdfCreatorService, writeTextRotate } from '../../../../core/services/pdf-creator.service';
import { sortByFirstname, StudentsService, formatFirstname } from '../../../../core/services/students.service';

@Injectable()
export class AttendanceGridService {

  constructor(
    private _pdfCreator: PdfCreatorService,
    private _studentsService: StudentsService
  ) { }

  public generate() {
    return this._studentsService.getStudents().pipe(
      map((students) => {

        const days = ['lundi', 'mardi', 'jeudi', 'vendredi'];
        const types = ['centre', 'présence', 'cantine', 'gouter', 'centre'];

        const maxColumns = days.length * types.length;

        students = students.sort(sortByFirstname);

        const widths: any[] = ['*'];
        for (let index = 0; index < maxColumns; index++) {
          widths.push(10);
        }

        const body = [];

        const header1: (string | any)[] = [{ text: '', rowSpan: 2 }];
        const header2: (string | any)[] = [''];

        for (let i = 0; i < days.length; i++) {
          for (let j = 0; j < types.length; j++) {
            const type = types[j];
            if (j === 0) {
              header1.push({ text: days[i], alignment: 'center', colSpan: types.length });
            } else {
              header1.push({});
            }
            header2.push({ image: writeTextRotate(type), fit: [7, 53], alignment: 'center' });
          }
        }
        body.push(header1);
        body.push(header2);

        students.forEach((student) => {
          const row = [];
          row.push({ text: formatFirstname(student.firstname), margin: [2, 5], fontSize: 10});

          for (let index = 0; index < maxColumns; index++) {
            row.push('');
          }

          body.push(row);
        });

        const docDefinition = {
          pageSize: 'A4',
          pageOrientation: 'portrait',
          content: [
            { text: 'Feuille de présences', style: 'header' },
            {
              table: {
                headerRows: 2,
                heights: (row) => row < 2 ? 'auto' : 20,
                widths,
                body,
              }
            }
          ],
          styles: {
            header: {
              fontSize: 18,
              bold: true,
              margin: [0, 0, 0, 20],
              alignment: 'center'
            },
            subheader: {
              fontSize: 16,
              bold: true,
              margin: [0, 10, 0, 5]
            },
          },
        };
        this._pdfCreator.create(docDefinition).open();
      })
    );
  }
}
