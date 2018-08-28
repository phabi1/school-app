import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Student {
  id: string;
  firstname: string;
  lastname: string;
  level: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getStudents(): Observable<Student[]> {
    return this.httpClient.get<any>('/assets/datas/class.json').pipe(
      map(res => res.students)
    );
  }
}

export function sortByFirstname (a: Student, b: Student) {
  if (a.firstname < b.firstname) {
    return -1;
  } else if (a.firstname > b.firstname) {
    return 1;
  } else {
    return 0;
  }
}

export function <formatFirstname (firstname: string) {
  return firstname;
}
