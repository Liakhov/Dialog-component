import {
  ComponentRef,
  ChangeDetectorRef,
  ViewContainerRef,
  ChangeDetectionStrategy,
  AfterViewInit,
  OnDestroy,
  Component,
  inject,
  Type,
  ViewChild
} from '@angular/core';

import { DIALOG_REF_TOKEN } from '@dialog/dialog.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  templateUrl: './dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent implements AfterViewInit, OnDestroy {
  public dynamicComponent: Type<unknown> | undefined;
  public dynamicComponentRef: ComponentRef<unknown> | undefined;
  private readonly dialogRef = inject(DIALOG_REF_TOKEN);
  private readonly cd = inject(ChangeDetectorRef);
  @ViewChild('dynamic', { read: ViewContainerRef }) viewRef!: ViewContainerRef;

  ngAfterViewInit(): void {
    if (!this.dynamicComponent) return;

    this.loadDynamicComponent(this.dynamicComponent);
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    if (!this.dynamicComponentRef) return;

    this.dynamicComponentRef.destroy();
  }

  onBackdropClick(): void {
    this.dialogRef.close();
  }

  onDialogClick(event: Event): void {
    event.stopPropagation()
  }

  loadDynamicComponent<C>(component: Type<C>): void {
    this.dynamicComponentRef = this.viewRef.createComponent(component);
  }
}
