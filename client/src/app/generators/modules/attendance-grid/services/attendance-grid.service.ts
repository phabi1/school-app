import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Student } from '../../../../core/models/student.model';
import { PdfCreatorService, writeTextRotate } from '../../../../core/services/pdf-creator.service';
import { sortByFirstname, StudentsService, formatFirstname } from '../../../../core/services/students.service';
import { Student } from '../../../../core/models/student.model';

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
        const types = ['présence', 'cantine', 'gouter'];

        const maxColumns = days.length * types.length;

        students = students.sort(sortByFirstname);

        const levels: { [key: string]: Student[] } = {};
        students.forEach((student) => {
          if (!levels[student.level]) {
            levels[student.level] = [];
          }
          levels[student.level].push(student);
        });

        const widths: any[] = ['*'];
        for (let index = 0; index < maxColumns; index++) {
          widths.push(20);
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

        let first = true;
        for (const key in levels) {
          if (levels.hasOwnProperty(key)) {
            const items = levels[key];
            items.forEach((student) => {
              const row = [];

              row.push({ text: formatFirstname(student.firstname), margin: [2, 5], fontSize: 12 });

              for (let index = 0; index < maxColumns; index++) {
                row.push('');
              }

              body.push(row);
            });
            if (first) {
              first = false;
              const separator = [];
              for (let index = 0; index < maxColumns + 1; index++) {
                separator.push('');
              }
              body.push(separator);
            }
          }
        }

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
        };
        this._pdfCreator.create(docDefinition).open();
      })
    );
  }
}
