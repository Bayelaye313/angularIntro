import { Component } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrl: './servers.component.css'
})
export class ServersComponent {
  allowNewServer = false;
  serverCreated = false;
  serverName = 'testServer'
  constructor(){
    setTimeout(()=>{
      this.allowNewServer = true;
    },2000)
  }
  serverOnCreated(){
    this.serverCreated = true;
  }
  getInputValue(event:Event){
    this.serverName = (<HTMLInputElement>event.target).value;

  }
}
