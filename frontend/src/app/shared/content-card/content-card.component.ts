import { NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ir-content-card',
  templateUrl: './content-card.component.html',
  styleUrl: './content-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, NgClass],
})
export class ContentCardComponent {
  @Input() cardTitle: string | null = null;
  @Input() hasShadow: boolean = true;
  @Input() noPaddingBottom: boolean = false;
}
