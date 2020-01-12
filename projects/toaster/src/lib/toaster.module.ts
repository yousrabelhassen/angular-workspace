import { NgModule } from '@angular/core';
import { ToasterComponent } from './toaster.component';
import { ToastComponent } from './toast/toast.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [ToasterComponent, ToastComponent],
  imports: [
    BrowserModule
  ],
  exports: [ToasterComponent]
})
export class ToasterModule { }
