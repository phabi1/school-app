import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StudentsService } from '../../../../core/services/students.service';

@Injectable({
  providedIn: 'root'
})
export class EvaluateGridService {

  constructor(
    private studentsService: StudentsService
  ) { }

  public generate(): Observable<boolean> {

    _.assign(pdfMake, { vfs: pdfFonts.pdfMake.vfs });

    return this.studentsService.getStudents()
      .pipe(
        map((students) => {

          students = students.sort((a, b) => {
            if (a.firstname < b.firstname) {
              return -1;
            } else if (a.firstname > b.firstname) {
              return 1;
            } else {
              return 0;
            }
          });

          const maxColumns = 10;

          const widths: any[] = ['*'];
          for (let i = 0; i < maxColumns; i++) {
            widths.push(20);
          }

          const body = [];

          const header = [
            ''
          ];
          for (let j = 0; j < maxColumns; j++) {
            header.push('');
          }
          body.push(header);


          for (const student of students) {
            const row: any[] = [
              { text: student.firstname, margin: [0, 5] }
            ];
            for (let j = 0; j < maxColumns; j++) {
              row.push('');
            }
            body.push(row);
          }

          const docDefinitions: any = {
            pageSize: 'A4',
            pageOrientation: 'portrait',
            content: [
              { text: 'Grille d\'évaluation' },
              {
                table: {
                  headerRows: 1,
                  heights: (index) => index === 0 ? 50 : 'auto',
                  widths,
                  body
                }
              }
            ]
          };

          pdfMake.createPdf(docDefinitions).open();

          return true;
        })
      );
  }
}
