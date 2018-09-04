import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';
import { map } from 'rxjs/operators';
import { Grade } from '../models/grade.model';

@Injectable()
export class StudentsService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  public getGrades(classId: string): Observable<Grade[]> {
    return this._httpClient.get<any>('/api/classes/' + classId).pipe(
      map((res) => res.grades)
    );
  }

  public getStudents(classId: string): Observable<Student[]> {
    return this._httpClient.get<any>('/api/classes/' + classId + '/students').pipe(
      map((res) => res)
    );
  }

  public createStudent(classId: string, data: any): Observable<Student> {
    return this._httpClient.post<any>('/api/classes/' + classId + '/students', data).pipe(
      map((res) => res)
    );
  }

}
