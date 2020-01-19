import { InjectionToken } from '@angular/core';

export type ToastType = 'success' | 'warning' | 'error';
export type ToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface ToasterDefaultOptions {
    timeout: number;
    position: ToastPosition;
    visibleToastsMaxCount: number;
}

export const TOASTER_DEFAULT_OPTIONS =
    new InjectionToken<ToasterDefaultOptions>('toaster-default-options', {
        providedIn: 'root',
        factory: TOASTER_DEFAULT_OPTIONS_FACTORY
    });

export function TOASTER_DEFAULT_OPTIONS_FACTORY(): ToasterDefaultOptions {
    return {
        timeout: 5000,
        position: 'top-right',
        visibleToastsMaxCount: 5,
    };
}

export interface Toast {
    id: string,
    type: ToastType,
    heading: string,
    message: string,
    subheading?: string,
    position: ToastPosition,
    timeout: number,
}

