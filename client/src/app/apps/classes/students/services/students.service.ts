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
      map((res) => res.map((el) => this.fromJson(el)))
    );
  }

  public createStudent(classId: string, data: any): Observable<Student> {
    return this._httpClient.post<any>('/api/classes/' + classId + '/students', data).pipe(
      map((res) => this.fromJson(res))
    );
  }

  public updateStudent(classId: string, id: string, data: any): Observable<Student> {
    return this._httpClient.put<any>('/api/classes/' + classId + '/students/' + id, data).pipe(
      map((res) => this.fromJson(res))
    );
  }

  public deleteStudent(classId: string, id: string): Observable<Student> {
    return this._httpClient.delete<any>('/api/classes/' + classId + '/students/' + id).pipe(
      map((res) => this.fromJson(res))
    );
  }

  private fromJson(data): Student {
    const obj: Student = {
      id: data.id || null,
      firstname: data.firstname || null,
      lastname: data.lastname || null,
      shortname: data.shortname || null,
      sex: data.sex || 'MALE',
      birthday: data.birthday || null,
      grade: data.grade || null,
      notes: data.notes || null,
      picture: data.picture || null,
      pictureUrl: data.pictureUrl || null,
    };
    return obj;
  }

}
