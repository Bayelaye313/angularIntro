import { Component } from '@angular/core';
import { HeroModel } from '../../utilities/interfce/hero.interface';
import { HeroService } from '../../services/hero.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent {
  heroes:HeroModel[] = [];
  selectedHero?:HeroModel;

  constructor(private heroService: HeroService, private messagerieService: MessageService) { }

  onClicked(hero:HeroModel):void{
    this.selectedHero = hero;
    this.messagerieService.add('HeroesComponent: Selected hero id=' + hero.id)
  }
  ngOnInit():void{
    this.heroService.getHeroes()
    .subscribe(her=> this.heroes = her)
  }


}
