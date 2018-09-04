import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';
import { map } from 'rxjs/operators';
import { Level } from '../models/level.model';

@Injectable()
export class StudentsService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  public getLevels(classId: string): Observable<Level[]> {
    return this._httpClient.get<any>('/api/classes/' + classId).pipe(
      map((res) => res.levels)
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

  public updateStudent(classId: string, id: string, data: any): Observable<Student> {
    return this._httpClient.post<any>('/api/classes/' + classId + '/students/' + id, data).pipe(
      map((res) => res)
    );
  }

  public deleteStudent(classId: string, id: string): Observable<Student> {
    return this._httpClient.delete<any>('/api/classes/' + classId + '/students/' + id).pipe(
      map((res) => res)
    );
  }

}
