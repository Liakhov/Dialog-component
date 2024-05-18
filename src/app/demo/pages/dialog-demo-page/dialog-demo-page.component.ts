import { Component, inject } from '@angular/core';

import { DemoDialogComponent } from "../../components/demo-dialog/demo-dialog.component";
import { DialogService } from "@dialog/dialog.service";

@Component({
  selector: 'app-dialog-demo-page',
  standalone: true,
  templateUrl: './dialog-demo-page.component.html',
  providers: [DialogService]
})
export class DialogDemoPageComponent {
  private dialogService = inject(DialogService);

  public onOpenDialog(): void {
    this.dialogService.open(DemoDialogComponent).afterClosed.subscribe()
  }
}
