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

  constructor(private heroService: HeroService, private messagerieService: MessageService) { }

  ngOnInit():void{
    this.getHeroes()
  }

  getHeroes():void{
    this.heroService.getHeroes()
    .subscribe(her=> this.heroes = her)

  }

}
