import { Component } from "@angular/core";


@Component({
    selector: 'app-server',
    templateUrl: './server.component.html'
})

export class ServerComponent{
    serverId = 12;
    serverStatus = 'Online';
    constructor(){
        this.serverStatus = Math.random() > 0.5 ? 'Online' : 'OffLine'
    }
    getServerStatus(){
        return this.serverStatus
    }

}