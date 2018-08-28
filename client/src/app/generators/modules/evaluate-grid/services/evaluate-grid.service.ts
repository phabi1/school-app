import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PdfCreatorService } from '../../../../core/services/pdf-creator.service';
import { StudentsService, sortByFirstname } from '../../../../core/services/students.service';

@Injectable({
  providedIn: 'root'
})
export class EvaluateGridService {

  constructor(
    private _pdfCreator: PdfCreatorService,
    private _studentsService: StudentsService
  ) { }

  public generate(): Observable<boolean> {

    return this._studentsService.getStudents()
      .pipe(
        map((students) => {

          students = students.sort(sortByFirstname);

          const levels = {};
          students.forEach((student) => {
            if (!levels[student.level]) {
              levels[student.level] = { students: [] };
            }
            levels[student.level].students.push(student);
          });

          const maxColumns = 10;

          const widths: any[] = ['*'];
          for (let i = 0; i < maxColumns; i++) {
            widths.push(20);
          }

          const content = [];


          const header = [
            ''
          ];
          for (let j = 0; j < maxColumns; j++) {
            header.push('');
          }

          for (const key in levels) {
            if (levels.hasOwnProperty(key)) {
              const level = levels[key];

              const body = [];

              body.push(header);

              for (const student of level.students) {
                const row: any[] = [
                  { text: student.firstname, margin: [0, 5] }
                ];
                for (let j = 0; j < maxColumns; j++) {
                  row.push('');
                }
                body.push(row);
              }

              content.push([
                { text: 'Grille d\'évaluation' },
                {
                  table: {
                    headerRows: 1,
                    heights: (index) => index === 0 ? 50 : 'auto',
                    widths,
                    body,
                  },
                  pageBreak: 'after'
                }
              ]);
            }
          }

          const docDefinitions: any = {
            pageSize: 'A4',
            pageOrientation: 'portrait',
            content,
          };

          this._pdfCreator.create(docDefinitions).open();

          return true;
        })
      );
  }
}
