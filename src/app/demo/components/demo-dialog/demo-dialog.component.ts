import { Component, HostListener, inject } from '@angular/core';

import { DIALOG_REF_TOKEN } from "@dialog/dialog.service";

@Component({
  selector: 'app-demo-dialog',
  standalone: true,
  templateUrl: './demo-dialog.component.html'
})
export class DemoDialogComponent {
  private dialogRef = inject(DIALOG_REF_TOKEN);

  @HostListener('document:keydown.esc', ['$event']) onEscKeydownHandler(): void {
    this.onClose();
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public onConfirm(): void {
    this.dialogRef.close(true);
  }
}
