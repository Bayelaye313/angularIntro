import { Component } from '@angular/core';
import { HeroModel } from './utilities/interfce/hero.interface';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent {
  heroes:HeroModel[] = [];
  selectedHero?:HeroModel;

  constructor(private heroService: HeroService) { }

  onClicked(hero:HeroModel):void{
    this.selectedHero = hero;
  }
  ngOnInit():void{
    this.heroes = this.heroService.getHeroes()
  }


}
