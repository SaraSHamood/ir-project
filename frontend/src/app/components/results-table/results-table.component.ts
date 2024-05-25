import { PrimeTemplate } from 'primeng/api';
import { TableModule } from 'primeng/table';

import { NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'ir-results-table',
  standalone: true,
  imports: [TableModule, NgFor],
  templateUrl: './results-table.component.html',
  styleUrl: './results-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsTableComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bodyTemplate!: TemplateRef<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @ContentChildren(PrimeTemplate) templates!: QueryList<any>;

  @Input({ required: true }) value!: Array<unknown>;

  readonly COLUMNS: Array<string> = ['Doc id', 'Title', 'Content length'];

  ngOnInit(): void {
    this.bodyTemplate = this.getPrimeTemplateByType('body')?.template;
  }

  private getPrimeTemplateByType(type: string): PrimeTemplate {
    return this.templates?.find((template) => template?.getType() === type);
  }
}
