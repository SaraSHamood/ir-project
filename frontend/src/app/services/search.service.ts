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

  constructor(private readonly _http: HttpClient) {}

  public searchDataset(
    query: string,
    dataset: boolean,
    clustering: boolean,
    embedding: boolean,
  ): Observable<Array<string>> {
    const queryParam = new HttpParams().appendAll({
      q: query,
      dataset: dataset ? 'touche' : 'antique',
      clustering: clustering,
    });

    // //! Delete after apis are finished
    // if (datasetChoice) {
    //   return of([
    //     { id: 1, title: 'Doe', length: '70 page' },
    //     { id: 2, title: 'John', length: '70 page' },
    //     { id: 3, title: 'Jack', length: '70 page' },
    //   ]);
    // } else {
    //   return of([
    //     { id: 4, title: 'Doe', length: '70 page' },
    //     { id: 5, title: 'John', length: '70 page' },
    //     { id: 6, title: 'Jack', length: '70 page' },
    //   ]);
    // }

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

    // //! Delete after apis are finished
    // if (datasetChoice) {
    //   return of(['Hello', 'My', 'Name']);
    // } else {
    //   return of(['is', 'S', 'Hamoud']);
    // }

    return this._http.get<Array<string>>(
      `${environment.CURRENT_DOMAIN}${this.suggestions}`,
      {
        params: queryParam,
      },
    );
  }
}
