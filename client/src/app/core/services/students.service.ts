import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Student } from '../models/student.model';
import { ClassService } from './class.service';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(
    private _classService: ClassService,
  ) { }

  getStudents(): Observable<Student[]> {
    return this._classService.getStudents();
  }
}

export function sortByFirstname(a: Student, b: Student): number {
  if (a.firstname < b.firstname) {
    return -1;
  } else if (a.firstname > b.firstname) {
    return 1;
  } else {
    return 0;
  }
}

export function formatFirstname(str: string): string {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
