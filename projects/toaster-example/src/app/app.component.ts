import { Component } from '@angular/core';
import { ToasterService } from 'toaster';
import { ToastPosition } from 'toaster/lib/toaster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private toasterService: ToasterService){    
  }

  createSuccessToast(position: ToastPosition){
    this.toasterService.success(
      "Success", "This is a success message", "My success Subheading", position
    );
  }

  createWarnToast(position: ToastPosition){
    this.toasterService.warning(
      "Warn", "This is a warning message", "My warning Subheading", position
    );
  }

  createErrorToast(position: ToastPosition){
    this.toasterService.error(
      "Error", "This is a error message", "My error Subheading", position
    );
  }

}
