import { Component, OnInit } from '@angular/core';
import { HeroModel } from '../../utilities/interfce/hero.interface';
import { HeroService } from '../../services/hero.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})
export class HeroDetailComponent {
  hero: HeroModel | undefined;
  constructor(
    private heroservice: HeroService,
    private route: ActivatedRoute,
    private location: Location){}
    ngOnInit():void{
      this.getHero()
    }
    getHero():void{
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.heroservice.getHero(id).subscribe(
        her=> this.hero = her
      )
    }
    goBack():void{
      this.location.back()
    }
  
}
