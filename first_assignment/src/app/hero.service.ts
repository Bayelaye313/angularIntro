import { Injectable, OnInit } from '@angular/core';
import { HEROES } from './heroes/utilities/dumping/mock.heroes';
import { HeroModel } from './heroes/utilities/interfce/hero.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  getHeroes():HeroModel[]{
    return HEROES
  }
}
