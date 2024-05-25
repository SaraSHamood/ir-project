/* eslint-disable @typescript-eslint/typedef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable, of } from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  readonly searchFirstDataSet = '/search/1';
  readonly searchSecondDataSet = '/search/2';

  constructor(private readonly _http: HttpClient) {}

  public searchDataset(query: string, datasetChoice: boolean): Observable<any> {
    const queryParam = new HttpParams().appendAll({
      search: query,
    });

    //! Delete after apis are finished
    if (datasetChoice) {
      return of([
        { id: 1, title: 'Doe', length: '70 page' },
        { id: 2, title: 'John', length: '70 page' },
        { id: 3, title: 'Jack', length: '70 page' },
      ]);
    } else {
      return of([
        { id: 4, title: 'Doe', length: '70 page' },
        { id: 5, title: 'John', length: '70 page' },
        { id: 6, title: 'Jack', length: '70 page' },
      ]);
    }

    return this._http.get<any>(
      `${environment.CURRENT_DOMAIN}${
        datasetChoice ? this.searchFirstDataSet : this.searchSecondDataSet
      }`,
      {
        params: queryParam,
      },
    );
  }
}
