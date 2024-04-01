import { Component, OnInit } from '@angular/core';
import { RecipeModel } from '../../NosModels/recipe.model';
import { createdrecipes } from '../../datafake/recipe.generator';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
  recette!:RecipeModel[];
  ngOnInit(){
    this.recette = createdrecipes(5)
  }

}
