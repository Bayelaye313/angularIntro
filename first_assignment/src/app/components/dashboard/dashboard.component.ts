import { Component, OnInit } from '@angular/core';
import { HeroModel } from '../../utilities/interfce/hero.interface';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  heroes:HeroModel[] =  [];

  constructor(private heroServe: HeroService){}

  ngOnInit():void{
    this.getHero()
  }
  getHero():void{
    this.heroServe.getHeroes().subscribe(
      her=>this.heroes = her.slice(1,5)
    )

  }

}
