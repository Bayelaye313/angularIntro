import { Component } from '@angular/core';

@Component({
  selector: 'app-success-alert',
  template: `
  <div>
    <p>success-alert works!</p>
  </div>`,
  styles: [`p{
    color: green;
    font-size: 18px;
  }`]
})
export class SuccessAlertComponent {

}
