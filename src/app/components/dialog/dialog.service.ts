import {
  ApplicationRef,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  InjectionToken,
  Injector,
  createComponent,
  Type
} from '@angular/core';
import { tap } from 'rxjs';

import { DialogComponent } from './dialog.component';
import { DialogConfig } from '@dialog/dialog-config';
import { DialogRef } from '@dialog/dialog-ref';

export const DIALOG_CONFIG_TOKEN = new InjectionToken<Record<string, unknown>>('dialog-config');
export const DIALOG_REF_TOKEN = new InjectionToken<DialogRef>('dialog-ref');

@Injectable()
export class DialogService {
  public dialogComponentRef!: ComponentRef<DialogComponent>;

  constructor(
    private applicationRef: ApplicationRef,
    private injector: Injector
  ) {}

  public open<C>(componentType: Type<C>, config: DialogConfig): DialogRef {
    const dialogRef = this.appendDialogComponentToBody(config);
    this.dialogComponentRef.instance.dynamicComponent = componentType;
    this.observeClosingDialog(dialogRef);
    return dialogRef;
  }

  private appendDialogComponentToBody(config: DialogConfig): DialogRef {
    const dialogRef = new DialogRef();

    const componentRef = createComponent(DialogComponent, {
      environmentInjector: this.applicationRef.injector,
      elementInjector: Injector.create({
        parent: this.injector,
        providers: [
          {
            provide: DIALOG_CONFIG_TOKEN,
            useValue: config
          },
          {
            provide: DIALOG_REF_TOKEN,
            useValue: dialogRef
          }
        ]
      })
    });
    this.applicationRef.attachView(componentRef.hostView);

    const rootHtmlElementDialogComponent = (componentRef.hostView as EmbeddedViewRef<unknown>).rootNodes[0] as HTMLElement;
    document.body.append(rootHtmlElementDialogComponent);
    this.dialogComponentRef = componentRef;
    return dialogRef;
  }

  private removeDialogComponentFromBody() {
    if (!this.dialogComponentRef) return;

    this.applicationRef.detachView(this.dialogComponentRef.hostView);
    this.dialogComponentRef.destroy();
  }

  private observeClosingDialog(dialogRef: DialogRef): void {
    dialogRef.afterClosed
      .pipe(
        tap(() => this.removeDialogComponentFromBody())
      )
      .subscribe()
  }
}
