import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import * as queryString from 'query-string';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PdfCreatorService } from '../../../../../core/services/pdf-creator.service';
import { StudentsService } from '../../../../../core/services/students.service';
import { Grade } from '../models/grade.model';
import { Layout } from '../models/layout.model';
import { Student } from '../models/student.model';

function sortByFirstname(a: Student, b: Student): number {
  if (a.firstname < b.firstname) {
    return -1;
  } else if (a.firstname > b.firstname) {
    return 1;
  } else {
    return 0;
  }
}

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

  getGrades(classId: string): Observable<Grade[]> {
    return this._httpClient.get<any>('/api/classes/' + classId).pipe(
      map((res) => {
        return res.grades.map(grade => {
          return { id: grade.id, title: grade.title, selected: false };
        });
      }),
    );
  }

  generate(classId: string, options: {
    students: string[],
    layout: { type: string, options?: any },
  }): Observable<boolean> {

    const params = {
      classId,
      ...options
    };
    return this._httpClient.post(environment.api.endpoint + '/generate/label', params, { responseType: 'blob' }).pipe(
      map((res) => {
        const url = window.URL.createObjectURL(res);
        window.open(url);
        // const a = document.createElement('a');
        // document.body.appendChild(a);
        // a.setAttribute('style', 'display:none');
        // a.href = url;
        // a.download = 'test';
        // a.click();
        // window.URL.revokeObjectURL(url);
        // a.remove();
        return true;
      })
    );
  }
}
