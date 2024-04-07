import { Injectable, OnInit } from '@angular/core';
import { HEROES } from '../utilities/dumping/mock.heroes';
import { HeroModel } from '../utilities/interfce/hero.interface';
import { Observable,of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  constructor(private messagerieService: MessageService){}

  getHeroes(): Observable<HeroModel[]>{
    const heroes = of(HEROES);
    this.messagerieService.add('heroes are fetched')
    return heroes
  }
  getHero(id: number): Observable<HeroModel> {
    const hero = HEROES.find(h => h.id === id)!;
    this.messagerieService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }
}
