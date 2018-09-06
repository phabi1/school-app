import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PdfCreatorService } from '../../../../../../core/services/pdf-creator.service';
import { StudentsService, sortByFirstname, formatFirstname } from '../../../../../../core/services/students.service';

@Injectable({
  providedIn: 'root'
})
export class EvaluateGridService {

  constructor(
    private _pdfCreator: PdfCreatorService,
    private _studentsService: StudentsService
  ) { }

  public getLayoutOptions(): Observable<any[]> {
    return of([
      {
        data: 'layout1',
        label: 'Modèle 1',
      },
      {
        data: 'layout2',
        label: 'Modèle 2',
      },
      {
        data: 'layout3',
        label: 'Modèle 3',
      },
      {
        data: 'layout4',
        label: 'Modèle 4',
      }
    ]);
  }

  public generate(options: {
    layout: string,
  }): Observable<boolean> {

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

          let content: any;
          switch (options.layout) {
            case 'layout1':
              content = this.renderLayout1(levels);
              break;
            case 'layout2':
              content = this.renderLayout2(levels);
              break;
            case 'layout3':
              content = this.renderLayout3(levels);
              break;
            case 'layout4':
              content = this.renderLayout4(levels);
              break;
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

  private renderLayout1(levels: any): any {
    const maxColumns = 10;

    const widths: any[] = [100];
    for (let i = 0; i < maxColumns; i++) {
      widths.push('*');
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
            { text: formatFirstname(student.firstname), margin: [0, 5] }
          ];
          for (let j = 0; j < maxColumns; j++) {
            row.push('');
          }
          body.push(row);
        }

        content.push([
          { text: 'Grille d\'évaluation formative', style: 'header' },
          {
            table: {
              headerRows: 1,
              heights: (index) => index === 0 ? 100 : 'auto',
              widths,
              body,
            },
            pageBreak: 'after'
          }
        ]);
      }
    }

    return content;
  }

  private renderLayout2(levels: any): any {
    const maxColumns = 1;

    const widths: any[] = [100];
    for (let i = 0; i < maxColumns; i++) {
      widths.push('*');
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
            { text: formatFirstname(student.firstname), margin: [0, 5] }
          ];
          for (let j = 0; j < maxColumns; j++) {
            row.push('');
          }
          body.push(row);
        }

        const table: any = {
          table: {
            headerRows: 1,
            heights: (index) => index === 0 ? 50 : 'auto',
            widths,
            body,
          },
        };

        table.pageBreak = 'after';

        content.push([
          { text: 'Grille d\'évaluation formative', style: 'header' },
          table
        ]);
      }
    }
    return content;
  }

  private renderLayout3(levels: any): any {
    const maxColumns = 10;

    const widths: any[] = [100];
    for (let i = 0; i < maxColumns; i++) {
      widths.push('*');
    }

    const header = [
      ''
    ];
    for (let j = 0; j < maxColumns; j++) {
      header.push('');
    }

    const body = [];

    const groups = [];

    let k = 0;
    for (const key in levels) {
      if (levels.hasOwnProperty(key)) {
        const level = levels[key];

        body.push(header);
        groups.push(k + 1);

        for (const student of level.students) {
          const row: any[] = [
            { text: formatFirstname(student.firstname), margin: [0, 5] }
          ];

          for (let j = 0; j < maxColumns; j++) {
            row.push('');
          }
          body.push(row);
          k++;
        }
      }
    }

    return [
      { text: 'Grille d\'évaluation formative', style: 'header' },
      {
        table: {
          headerRows: 1,
          heights: (index) => {
            if (index === 0) {
              return 100;
            } else if (groups.includes(index)) {
              return 25;
            } else { return 'auto'; }
          },
          widths,
          body,
        },
      }
    ];
  }

  private renderLayout4(levels: any): any {
    const maxColumns = 1;

    const widths: any[] = [100];
    for (let i = 0; i < maxColumns; i++) {
      widths.push('*');
    }

    const header = [
      ''
    ];
    for (let j = 0; j < maxColumns; j++) {
      header.push('');
    }

    const body = [];
    const groups = [];

    let k = 0;
    for (const key in levels) {
      if (levels.hasOwnProperty(key)) {
        const level = levels[key];

        body.push(header);
        groups.push(k + 1);

        for (const student of level.students) {
          const row: any[] = [
            { text: formatFirstname(student.firstname), margin: [0, 5] }
          ];
          for (let j = 0; j < maxColumns; j++) {
            row.push('');
          }
          body.push(row);
          k++;
        }
      }
    }

    return [
      { text: 'Grille d\'évaluation formative', style: 'header' },
      {
        table: {
          headerRows: 1,
          heights: (index) => {
            if (index === 0) {
              return 50;
            } else if (groups.includes(index)) {
              return 25;
            } else {
              return 'auto';
            }
          },
          widths,
          body,
        },
      }
    ];
  }
}
