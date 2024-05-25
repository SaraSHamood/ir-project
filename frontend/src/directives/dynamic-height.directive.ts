import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[irDynamicHeight]',
  standalone: true,
})
export class DynamicHeightDirective implements AfterViewInit, OnDestroy {
  @Input({ required: true }) irDynamicHeight!: string;
  private resizeObserver!: ResizeObserver;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {}

  ngAfterViewInit(): void {
    this.setHeight();
    this.setupResizeObserver();
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
  }

  private setHeight(): void {
    const containerHeight: number =
      this.elementRef.nativeElement.parentElement.clientHeight;
    const targetHeight: number = containerHeight * +this.irDynamicHeight - 40;

    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'height',
      `${targetHeight}px`,
    );
  }

  private setupResizeObserver(): void {
    this.resizeObserver = new ResizeObserver(() => {
      this.setHeight();
    });
    this.resizeObserver.observe(this.elementRef.nativeElement.parentElement);
  }
}
