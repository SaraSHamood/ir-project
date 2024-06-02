import { TableModule } from 'primeng/table';

import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ir-results-table',
  standalone: true,
  imports: [TableModule, NgFor],
  templateUrl: './results-table.component.html',
  styleUrl: './results-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsTableComponent {
  @Input({ required: true }) value!: Array<unknown>;

  readonly COLUMNS: Array<string> = ['Doc id'];
}
