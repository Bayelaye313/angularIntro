import { Component } from '@angular/core';
import { HEROES } from './utilities/dumping/mock.heroes';
import { HeroModel } from './utilities/interfce/hero.interface';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent {
  heroes = HEROES;
  selectedHero?:HeroModel;

  onClicked(hero:HeroModel):void{
    this.selectedHero = hero;
  }

}
