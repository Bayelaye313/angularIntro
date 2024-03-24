import { Component } from '@angular/core';

@Component({
  selector: 'app-warning-alert',
  template: `
  <div>
    <p>warning-alert works!</p>
  </div>`,
  styles: [`p{
    background-color: pink;
    font-size: 18px;
    padding: 18px;
    border: 1px solid orange;
  }`]
})
export class WarningAlertComponent {

}
