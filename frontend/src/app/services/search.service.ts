/* eslint-disable @typescript-eslint/typedef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable } from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  readonly suggestions = '/suggest';
  readonly tag = '/tags';

  constructor(private readonly _http: HttpClient) {}

  public searchDataset(
    query: string,
    dataset: boolean,
    clustering: boolean,
  ): Observable<Array<string>> {
    const queryParam = new HttpParams().appendAll({
      q: query,
      dataset: dataset ? 'touche' : 'antique',
      clustering: clustering,
    });

    return this._http.get<Array<string>>(`${environment.CURRENT_DOMAIN}`, {
      params: queryParam,
    });
  }

  public searchSuggestions(
    query: string,
    dataset: boolean,
  ): Observable<Array<string>> {
    const queryParam = new HttpParams().appendAll({
      q: query,
      dataset: dataset ? 'touche' : 'antique',
    });

    return this._http.get<Array<string>>(
      `${environment.CURRENT_DOMAIN}${this.suggestions}`,
      {
        params: queryParam,
      },
    );
  }

  public tags(query: string, dataset: boolean): Observable<Array<string>> {
    const queryParam = new HttpParams().appendAll({
      q: query,
      dataset: dataset ? 'touche' : 'antique',
    });

    return this._http.get<Array<string>>(
      `${environment.CURRENT_DOMAIN}${this.tag}`,
      {
        params: queryParam,
      },
    );
  }
}
