import { Injectable, Optional, Inject } from '@angular/core';
import { TOASTER_DEFAULT_OPTIONS, ToasterDefaultOptions } from './toaster';
import { Toast } from './toaster';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  private toasts: BehaviorSubject<Toast[]> = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.toasts.asObservable();

  constructor(@Inject(TOASTER_DEFAULT_OPTIONS) private _defaultOptions: ToasterDefaultOptions) { }

  success(heading: string,
    message: string,
    subheading?: string,
    position = this._defaultOptions.position,
    timeout = this._defaultOptions.timeout): void {
    this.showToast({
      type: 'success', heading: heading, message: message, subheading: subheading, position: position, timeout: timeout
    });
  }

  warning(heading: string,
    message: string,
    subheading?: string,
    position = this._defaultOptions.position,
    timeout = this._defaultOptions.timeout): void {
    this.showToast({
      type: 'warning', heading: heading, message: message, subheading: subheading, position: position, timeout: timeout
    });
  }

  error(heading: string,
    message: string,
    subheading?: string,
    position = this._defaultOptions.position,
    timeout = this._defaultOptions.timeout): void {
    this.showToast({
      type: 'error', heading: heading, message: message, subheading: subheading, position: position, timeout: timeout
    });
  }


  private showToast(toast: Toast): void {
    this.toasts.next([...this.toasts.getValue(), toast]);
  }

}
