import { Component, OnInit, InjectionToken, Inject, Optional, OnDestroy } from '@angular/core';
import { ToasterService } from './toaster.service';
import { Subject } from 'rxjs';
import { take, takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { Toast, ToastPosition } from './toaster';

@Component({
  selector: 'lib-toaster',
  template: `
    <div class="toasts-container" *ngIf="toastsByPosition">
      <div class="toasts-top-left" *ngIf="toastsByPosition.get('top-left') as topLeftToasts">
        <lib-toast *ngFor="let toast of topLeftToasts" [toast]="toast"></lib-toast>
      </div>
      <div class="toasts-top-right" *ngIf="toastsByPosition.get('top-right') as topRightToasts">
        <lib-toast *ngFor="let toast of topRightToasts" [toast]="toast"></lib-toast>
      </div>
      <div class="toasts-bottom-left" *ngIf="toastsByPosition.get('bottom-left') as bottomLeftToasts">
        <lib-toast *ngFor="let toast of bottomLeftToasts" [toast]="toast"></lib-toast>
      </div>
      <div class="toasts-bottom-right" *ngIf="toastsByPosition.get('bottom-right') as bottomRightToasts">
        <lib-toast *ngFor="let toast of bottomRightToasts" [toast]="toast"></lib-toast>
      </div>
    </div>
  `,
  styles: [`
    .toasts-top-left { position: fixed; top:0; left: 0;}
    .toasts-top-right { position: fixed; top:0; right: 0;}
    .toasts-bottom-left { position: fixed; bottom:0; left: 0;}
    .toasts-bottom-right { position: fixed; bottom:0; right: 0;}
  `]
})
export class ToasterComponent implements OnInit, OnDestroy {

  toastsByPosition: Map<ToastPosition, Toast[]>;

  private readonly _destroyed = new Subject<void>();

  constructor(private toasterService: ToasterService) { }

  ngOnInit() {
    this.toasterService.toasts$
      .pipe(
        takeUntil(this._destroyed),
        distinctUntilChanged()
      )
      .subscribe(
        toasts => this.createToastsByPositionMap(toasts)
      );
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  private createToastsByPositionMap(toasts: Toast[]) {
    this.toastsByPosition = new Map();
    toasts.forEach(
      toast => {
        this.toastsByPosition.set(
          toast.position,
          this.toastsByPosition.has(toast.position)
            ? [...this.toastsByPosition.get(toast.position), toast]
            : [toast]
        )
      }
    );
    console.log(JSON.stringify(this.toastsByPosition, null, 3));
  }

}
