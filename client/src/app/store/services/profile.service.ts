import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private _httpClient: HttpClient,
  ) { }

  getProfile() {
    return this._httpClient.get(environment.api.endpoint + '/profile');
  }
}
