import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Level } from '../models/level.model';
import { map } from 'rxjs/operators';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  public getLevels(classId: string): Observable<Level[]> {
    return this._httpClient.get<any>('/api/classes/' + classId).pipe(
      map((res) => res.grades)
    );
  }

  public getStudents(classId: string): Observable<Student[]> {
    return this._httpClient.get<any>('/api/classes/' + classId + '/students').pipe(
      map(res => res.map((el) => {
        const obj = { ...el };
        obj.birthday = new Date(el.birthday);
        return obj;
      }))
    );
  }
}
