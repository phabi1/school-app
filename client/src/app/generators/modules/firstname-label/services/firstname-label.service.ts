import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { StudentsService, Student } from '../../../../core/services/students.service';
import { PdfCreatorService } from '../../../../core/services/pdf-creator.service';

@Injectable()
export class FirstnameLabelService {

  constructor(
    private _pdfCreator: PdfCreatorService,
    private _studentsService: StudentsService,
  ) { }

  generate(options?: {
    layout: string,
    align?: 'center' | 'left' | 'right',
  }): Observable<boolean> {

    _.assign(pdfMake, { vfs: pdfFonts.pdfMake.vfs });

    return this.getStudents().pipe(
      tap((students) => {
        this.selectLayout(options.layout, students, options);
      }),
      map(() => true));
  }

  private getStudents(): Observable<Student[]> {
    return this._studentsService.getStudents().pipe(
      map((students) => [...students, ...students])
    );
  }

  private selectLayout(layout: string, students: any[], options: any) {
    let definition: any;
    switch (layout) {
      case 'layout1':
        definition = this.renderLayout1(students, options);
        break;
      case 'layout2':
        definition = this.renderLayout2(students, options);
        break;
      default:
        break;
    }

    return this._pdfCreator.create(definition).open();
  }

  private renderLayout1(students: any[], options: { align: string }): any {

    const maxColumns = 2;

    const body = [];
    let row = null;
    for (let index = 0; index < students.length; index++) {

      if (!row) {
        row = [];
      }

      const student = students[index];

      let fontSize = 54;
      let margin = [0, 16];
      if (student.firstname.length > 10) {
        fontSize = 36;
        margin = [0, 25];
      }

      row.push({ text: student.firstname.toUpperCase(), fontSize, margin, alignment: options.align });

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

  private renderLayout2(students: any[], options: { align: string }): any {
    const maxColumns = 3;

    const body = [];
    let row = null;
    for (let index = 0; index < students.length; index++) {

      if (!row) {
        row = [];
      }

      const student = students[index];

      let fontSize = 40;
      let margin = [0, 18];

      const length = student.firstname.length;
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

      row.push({ text: student.firstname.toUpperCase(), fontSize, margin, alignment: options.align });

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
          // layout: 'noBorders'
        }
      ]
    };

    return docDefinitions;
  }
}
