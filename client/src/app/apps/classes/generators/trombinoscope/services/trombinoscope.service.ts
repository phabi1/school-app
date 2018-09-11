import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TrombinoscopeService {

  constructor(
    private _httpClient: HttpClient,
  ) { }

  generate(classId: string): Observable<boolean> {
    return this._httpClient.post(environment.api.endpoint + '/generate/trombinoscope', {
      classId
    }, { responseType: 'blob' }).pipe(
      map((data) => {
        const url = window.URL.createObjectURL(data);
        window.open(url);
        return true;
      })
    );
  }
}
