import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { HeroModel } from './utilities/interfce/hero.interface';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }
  //simulating bd
  createDb(){
      const heroes = [
        { id: 12, name: 'Dr. Nice' },
        { id: 13, name: 'Bombasto' },
        { id: 14, name: 'Celeritas' },
        { id: 15, name: 'Magneta' },
        { id: 16, name: 'RubberMan' },
        { id: 17, name: 'Dynama' },
        { id: 18, name: 'Dr. IQ' },
        { id: 19, name: 'Magma' },
        { id: 20, name: 'Tornado' }
      ];
    
    return {heroes}
  }
  //ensure de generate an unique id and  init by default id=11 if empty
  genUniqId(heroes:HeroModel[]):number{
    if (heroes.length > 0) {
      return Math.max(...heroes.map(hero =>hero.id)) + 1
    } else {
      return 11
    }
  }

}