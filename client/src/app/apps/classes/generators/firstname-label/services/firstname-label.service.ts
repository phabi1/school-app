import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PdfCreatorService } from '../../../../../core/services/pdf-creator.service';
import { StudentsService, sortByFirstname } from '../../../../../core/services/students.service';
import { Layout } from '../models/layout.model';
import { Student } from '../models/student.model';

@Injectable()
export class FirstnameLabelService {

  constructor(
    private _httpClient: HttpClient,
    private _pdfCreator: PdfCreatorService,
    private _studentsService: StudentsService,
  ) {
  }

  getLayouts(): Observable<Layout[]> {
    return of([
      {
        id: 'layout1',
        title: 'Modèle 1',
        imageUrl: '/assets/images/firstname-labels/layout1.png'
      },
      {
        id: 'layout2',
        title: 'Modèle 2',
        imageUrl: '/assets/images/firstname-labels/layout2.png'
      },
      {
        id: 'layout3',
        title: 'Modèle 3',
        imageUrl: '/assets/images/firstname-labels/layout3.png'
      },
      {
        id: 'layout4',
        title: 'Modèle 4',
        imageUrl: '/assets/images/firstname-labels/layout3.png'
      },
      {
        id: 'layout5',
        title: 'Modèle 5',
        imageUrl: '/assets/images/firstname-labels/layout3.png'
      },
    ]);
  }

  getStudents(classId: string): Observable<Student[]> {
    return this._httpClient.get<Student[]>('/api/classes/' + classId + '/students').pipe(
      map((res) => res.sort(sortByFirstname)),
    );
  }

  generate(classId: string, options: {
    students: string[],
    layout: { type: string, options?: any },
  }): Observable<boolean> {

    return this.getNames(classId, options.students).pipe(
      tap((students) => {
        this.selectLayout(options.layout, students);
      }),
      map(() => true));
  }

  private getNames(classId: string, students: string[]): Observable<string[]> {
    return this.getStudents(classId).pipe(
      map((res) => {

        const allow = students.length === 0;

        const names = [];
        res.forEach((el) => {
          if (allow || students.includes(el.id)) {
            names.push(el.firstname);
            if (el.shortname) {
              names.push(el.shortname);
            }
          }
        });
        return names;
      })
    );
  }

  private selectLayout(layout: { type: string, options?: any }, names: string[]) {
    let definition: any;
    switch (layout.type) {
      case 'layout1':
        definition = this.renderLayout1(names, { ...layout.options || {}, align: 'center' });
        break;
      case 'layout2':
        definition = this.renderLayout1(names, { ...layout.options || {}, align: 'left' });
        break;
      case 'layout3':
        definition = this.renderLayout2(names, layout.options);
        break;
      case 'layout4':
        definition = this.renderLayout3(names, layout.options);
        break;
        case 'layout5':
        definition = this.renderLayout4(names, layout.options);
        break;
      default:
        break;
    }

    return this._pdfCreator.create(definition).open();
  }

  private renderLayout1(names: string[], options: { align: string }): any {

    const maxColumns = 2;

    const body = [];
    let row = null;
    for (let index = 0; index < names.length; index++) {

      if (!row) {
        row = [];
      }

      const name = names[index];

      let fontSize = 54;
      let margin = [0, 16];
      if (name.length > 10) {
        fontSize = 36;
        margin = [0, 25];
      }

      row.push({ text: name.toUpperCase(), fontSize, margin, alignment: options.align });

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

    const widths = [];
    for (let i = 0; i < maxColumns; i++) {
      widths.push(350);
    }

    const docDefinitions: any = {
      pageOrientation: 'landscape',
      pageMargins: [20, 20],
      content: [
        {
          table: {
            dontBreakRows: true,
            widths,
            body
          }
        }
      ]
    };
    return docDefinitions;
  }

  private renderLayout2(names: string[], options: { align: string }): any {
    const maxColumns = 3;

    const body = [];
    let row = null;
    for (let index = 0; index < names.length; index++) {

      if (!row) {
        row = [];
      }

      const name = names[index];

      let fontSize = 40;
      let margin = [0, 18];

      const length = name.length;
      if (length >= 10) {
        fontSize = 20;
        margin = [0, 36];
      } else if (length > 6 && length < 10) {
        fontSize = 30;
        margin = [0, 29];
      } else {
        fontSize = 40;
        margin = [0, 24];
      }

      row.push({ text: name.toUpperCase(), fontSize, margin, alignment: options.align });

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

    const widths = [];
    for (let i = 0; i < maxColumns; i++) {
      widths.push('*');
    }

    const docDefinitions: any = {
      pageOrientation: 'portrait',
      pageMargins: [0, 20],
      content: [
        {
          table: {
            dontBreakRows: true,
            widths,
            body
          },
          layout: 'noBorders'
        }
      ]
    };

    return docDefinitions;
  }
  private renderLayout3(names: string[], options: {}): any {
    const maxColumns = 2;

    const body = [];
    let row = null;
    for (let index = 0; index < names.length; index++) {

      if (!row) {
        row = [];
      }

      const name = names[index];

      let fontSize = 40;
      let margin = [0, 5];

      const length = name.length;
      if (length >= 10) {
        fontSize = 20;
        margin = [0, 23];
      } else if (length > 6 && length < 10) {
        fontSize = 30;
        margin = [0, 16];
      } else {
        fontSize = 40;
        margin = [0, 11];
      }

      row.push({ text: name.toUpperCase(), fontSize, margin, alignment: 'center' });

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

    const widths = [];
    for (let i = 0; i < maxColumns; i++) {
      widths.push('*');
    }

    const docDefinitions: any = {
      pageOrientation: 'landscape',
      pageMargins: [80, 20],
      content: [
        {
          table: {
            dontBreakRows: true,
            widths,
            body
          },
        },
      ],
    };

    return docDefinitions;
  }

  private renderLayout4(names: string[], options: {}): any {

const letters = [];
names.forEach((name) => {
  for (let l = 0; l < name.length; l++) {
    const letter = name[l];
    letters.push(letter);
  }
});

    const maxColumns = 15;

    const body = [];
    let row = null;
    for (let index = 0; index < letters.length; index++) {

      if (!row) {
        row = [];
      }

      const name = letters[index];

      let fontSize = 40;
      let margin = [0, 5];

      const length = name.length;
      if (length >= 10) {
        fontSize = 20;
        margin = [0, 23];
      } else if (length > 6 && length < 10) {
        fontSize = 30;
        margin = [0, 16];
      } else {
        fontSize = 40;
        margin = [0, 11];
      }

      row.push({ text: name.toUpperCase(), fontSize, margin, alignment: 'center' });

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

    const widths = [];
    for (let i = 0; i < maxColumns; i++) {
      widths.push('*');
    }

    const docDefinitions: any = {
      pageOrientation: 'landscape',
      content: [
        {
          table: {
            dontBreakRows: true,
            widths,
            body
          },
        },
      ],
    };

    return docDefinitions;
  }
}
