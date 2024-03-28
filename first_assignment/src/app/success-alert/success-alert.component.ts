import { Component } from '@angular/core';

@Component({
  selector: 'app-success-alert',
  templateUrl: './success-alert.component.html',
  styles: [`p{
    background-color: lightgreen;
    font-size: 18px;
    padding: 18px;
    border: 1px solid green;
  }
  input{
    border: 1px solid black;
  }`]
})
export class SuccessAlertComponent {
  userName = '';
  bindUserName(){
    return this.userName    
  }

  resetName(){
    this.userName = ''
  }
}
