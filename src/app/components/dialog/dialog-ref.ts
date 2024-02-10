import { Observable, Subject, take } from 'rxjs'

export class DialogRef {
  public readonly _afterClosed = new Subject<unknown>();
  public afterClosed: Observable<unknown> = this._afterClosed.asObservable().pipe(take(1));

  close(result?: unknown): void {
    this._afterClosed.next(result)
  }
}
