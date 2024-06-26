/* eslint-disable @typescript-eslint/no-explicit-any */
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { CheckboxModule } from 'primeng/checkbox';
import { catchError, of, take, tap } from 'rxjs';

import { NgClass, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DynamicHeightDirective } from '../../directives/dynamic-height.directive';
import { SearchService } from '../services/search.service';
import { ContentCardComponent } from '../shared/content-card/content-card.component';

import { ResultsTableComponent } from './results-table/results-table.component';
import { TestsTableComponent } from './tests-table/tests-table.component';

@Component({
  selector: 'ir-content',
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    ResultsTableComponent,
    AutoCompleteModule,
    InputGroupModule,
    InputGroupAddonModule,
    TestsTableComponent,
    ContentCardComponent,
    FormsModule,
    ResultsTableComponent,
    DynamicHeightDirective,
    CheckboxModule,
  ],
})
export class ContentComponent {
  field!: string;
  datasetOne: boolean = true;
  clustering: boolean = false;

  filteredSignal: WritableSignal<Array<string>> = signal([]);
  displayedData: WritableSignal<Array<string>> = signal([]);
  tags: WritableSignal<Array<string>> = signal([]);

  constructor(private readonly _searchService: SearchService) {}

  public search(): void {
    this._searchService
      .searchDataset(this.field, this.datasetOne, this.clustering)
      .pipe(
        tap((res) => {
          this.displayedData.set(res);
        }),
        take(1),
        catchError(() => {
          this.displayedData.set(['Dataset', 'Data']);
          return of();
        }),
      )
      .subscribe();

    this._searchService
      .tags(this.field, this.datasetOne)
      .pipe(
        tap((res) => {
          this.tags.set(res);
        }),
        take(1),
        catchError(() => {
          this.tags.set(['tags', 'Data']);
          return of();
        }),
      )
      .subscribe();
  }

  public autoComplete(): void {
    this._searchService
      .searchSuggestions(this.field, this.datasetOne)
      .pipe(
        tap((res) => {
          this.filteredSignal.set(res);
        }),
        take(1),
        catchError(() => {
          this.filteredSignal.set(['hello', 'world']);
          return of();
        }),
      )
      .subscribe();
  }

  public setDataset(value: boolean): void {
    this.datasetOne = value;
  }
}
