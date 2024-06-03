import { TableModule } from 'primeng/table';

import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ir-tests-table',
  standalone: true,
  imports: [TableModule, NgFor],
  templateUrl: './tests-table.component.html',
  styleUrl: './tests-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestsTableComponent {
  @Input({ required: true }) value!: Array<string>;

  readonly COLUMNS: Array<string> = ['Tags'];
}
