import { Component, OnInit, InjectionToken, Inject, Optional, OnDestroy } from '@angular/core';
import { ToasterService } from './toaster.service';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Toast } from './toaster';

@Component({
  selector: 'lib-toaster',
  template: `
    <div class="toast-container" >
      <lib-toast *ngFor="let toast of toasts" [toast]="toast"></lib-toast>
    </div>
  `,
  styles: [`lib-toast+lib-toast{ margin-bottom: 10px; }`]
})
export class ToasterComponent implements OnInit, OnDestroy {

  toasts: Toast[];

  private readonly _destroyed = new Subject<void>();

  constructor(private toasterService: ToasterService) { }

  ngOnInit() {
    this.toasterService.toasts$
      .pipe(takeUntil(this._destroyed))
      .subscribe(
        toasts => this.toasts = toasts
      );
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

}
