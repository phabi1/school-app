import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable()
export class MonthPyramidService {

  constructor(
    private _httpClient: HttpClient,
  ) { }

  public generate(classId: string): Observable<boolean> {
    return this._httpClient.post(environment.api.endpoint + '/generate/month-pyramid', { classId }, { responseType: 'blob' }).pipe(
      map((res) => {
        const url = window.URL.createObjectURL(res);
        window.open(url);
        return true;
      })
    );
  }
}
