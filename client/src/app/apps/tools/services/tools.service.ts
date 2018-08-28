import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tool } from '../models/tool.model';
import { map } from 'rxjs/operators';

@Injectable()
export class ToolsService {

  constructor(
    private http: HttpClient,
  ) { }

  public getAllTools(): Observable<Tool[]> {
    return this.http.get<any>('/assets/datas/tools.json').pipe(
      map((res) => res.tools)
    );
  }

}
