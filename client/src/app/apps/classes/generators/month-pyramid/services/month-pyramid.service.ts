import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as CanvasJS from '../../../../../../canvasjs.min';
import { PdfCreatorService } from '../../../../../core/services/pdf-creator.service';
import { StudentsService } from '../../../../../core/services/students.service';

@Injectable()
export class MonthPyramidService {

  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private _pdfCreator: PdfCreatorService,
    private _studentsService: StudentsService
  ) { }

  public generate(): Observable<boolean> {
    return this._studentsService.getStudents().pipe(
      map((students) => {


        const months = [
          {
            label: 'janvier',
            count: 0
          },
          {
            label: 'février',
            count: 0
          },
          {
            label: 'mars',
            count: 0
          },
          {
            label: 'avril',
            count: 0
          },
          {
            label: 'mai',
            count: 0
          },
          {
            label: 'juin',
            count: 0
          },
          {
            label: 'juillet',
            count: 0
          },
          {
            label: 'août',
            count: 0
          },
          {
            label: 'septembre',
            count: 0
          },
          {
            label: 'octobre',
            count: 0
          },
          {
            label: 'novembre',
            count: 0
          },
          {
            label: 'décembre',
            count: 0
          }];

        students.forEach((student) => {
          const month = student.birthday.getMonth();
          months[month].count = months[month].count + 1;
        });

        const data = months.map((el) => {
          return { label: el.label, y: el.count };
        });

        const docDefinition = {
          pageSize: 'A4',
          pageOriantation: 'landscape',
          content: [
            { image: this.createGraph(data) }
          ]
        };

        this._pdfCreator.create(docDefinition).open();

        return true;
      })
    );
  }

  private createGraph(data): string {

    const container = this._document.createElement('div');

    const chart = new CanvasJS.Chart(container, {
      animationEnabled: false,
      exportEnabled: true,
      title: {
        text: 'Basic Column Chart in Angular'
      },
      data: [{
        type: 'column',
        dataPoints: data,
      }],
    });
    chart.render();
    const canvas = container.querySelector('.canvasjs-chart-canvas');
    return (canvas as any).toDataURL();
  }
}
