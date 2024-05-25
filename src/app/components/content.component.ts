/* eslint-disable @typescript-eslint/no-explicit-any */
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { take, tap } from 'rxjs';

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
  ],
})
export class ContentComponent {
  field!: string;
  datasetOne: boolean = true;

  filteredSignal: WritableSignal<Array<string>> = signal([]);
  displayedData: WritableSignal<Array<string>> = signal([]);

  constructor(private readonly _searchService: SearchService) {}

  public search(): void {
    console.log('Searched for: ', this.field);

    this._searchService
      .searchDataset(this.field, this.datasetOne)
      .pipe(
        tap((res) => {
          this.displayedData.set(res);
        }),
        take(1),
      )
      .subscribe();
  }

  public setDataset(value: boolean): void {
    this.datasetOne = value;
  }
}
