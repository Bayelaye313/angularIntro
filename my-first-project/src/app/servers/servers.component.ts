import { Component } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrl: './servers.component.css'
})
export class ServersComponent {
  allowNewServer = false;
  serverCreated = 'No server Is Created';
  serverName = 'testServer'
  constructor(){
    setTimeout(()=>{
      this.allowNewServer = true;
    },2000)
  }
  serverOnCreated(){
    this.serverCreated = 'New server Is Created, server Name is :'+this.serverName
  }
  getInputValue(event:Event){
    this.serverName = (<HTMLInputElement>event.target).value;

  }
}
