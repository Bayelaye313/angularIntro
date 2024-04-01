import { faker } from '@faker-js/faker';
import { RecipeModel } from '../NosModels/recipe.model';

export function createRecipe(): RecipeModel{
    return{
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        image: faker.image.urlLoremFlickr({ category: 'food' })
    }
}

export function createdrecipes(numberOfRecipe:number = 10): RecipeModel[]{
    return faker.helpers.multiple(createRecipe, {
        count: numberOfRecipe,
      });
}