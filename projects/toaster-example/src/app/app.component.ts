import { Component } from '@angular/core';
import { ToasterService } from 'toaster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private toasterService: ToasterService){    
  }

  createSuccessToast(){
    this.toasterService.success(
      "Success", "This is a success message", "My success Subheading"
    );
  }

  createWarnToast(){
    this.toasterService.warning(
      "Warn", "This is a warning message", "My warning Subheading"
    );
  }

  createErrorToast(){
    this.toasterService.error(
      "Error", "This is a error message", "My error Subheading"
    );
  }

}
