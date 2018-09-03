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

  public getLevels(): Observable<Level[]> {
    return this._httpClient.get<any>('/assets/datas/class.json').pipe(
      map((res) => res.levels)
    );
  }

  public getStudents(): Observable<Student[]> {
    return this._httpClient.get<any>('/assets/datas/class.json').pipe(
      map(res => res.students.map((el) => {
        const obj = { ...el };
        const [day, month, year] = el.birthday.split('-');
        obj.birthday = new Date(+year, +month, +day);
        return obj;
      }))
    );
  }
}
