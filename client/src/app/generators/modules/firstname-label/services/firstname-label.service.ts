import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Student } from '../../../../classes/modules/students/models/student.model';
import { StudentsService } from '../../../../core/services/students.service';
import { PdfCreatorService } from '../../../../core/services/pdf-creator.service';
import { ClassService } from '../../../../core/services/class.service';
import { Level } from '../../../../core/models/level.model';

@Injectable()
export class FirstnameLabelService {

  constructor(
    private _classService: ClassService,
    private _pdfCreator: PdfCreatorService,
    private _studentsService: StudentsService,
  ) { }

  getLevels(): Observable<Level[]> {
    return this._classService.getLevels();
  }

  generate(options?: {
    students: string[],
    layout: string,
    align?: 'center' | 'left' | 'right',
  }): Observable<boolean> {

    return this.getNames(options.students).pipe(
      tap((students) => {
        this.selectLayout(options.layout, students, options);
      }),
      map(() => true));
  }

  private getNames(students: string[]): Observable<string[]> {
    return this._studentsService.getStudents().pipe(
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

  private selectLayout(layout: string, names: string[], options: any) {
    let definition: any;
    switch (layout) {
      case 'layout1':
        definition = this.renderLayout1(names, options);
        break;
      case 'layout2':
        definition = this.renderLayout2(names, options);
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
}
