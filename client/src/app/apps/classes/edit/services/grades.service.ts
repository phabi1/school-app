import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Grade } from '../models/grade.model';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class GradesService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  getGrades(): Observable<Grade[]> {
    const params = new HttpParams().set('parent', '5b9bbd13c439cc0fc82d18f4');
    return this._httpClient.get<any>(environment.api.endpoint + '/grades', { params }).pipe(
      map((res) => res.map((el) => ({ id: el.id, title: el.title })))
    );
  }

  getClass (classId): Observable<any> {
    return this._httpClient.get<any>(environment.api.endpoint + '/classes/' + classId);
  }
}
