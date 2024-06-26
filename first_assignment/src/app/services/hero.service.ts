import { Injectable, OnInit } from '@angular/core';
import { HEROES } from '../utilities/dumping/mock.heroes';
import { HeroModel } from '../utilities/interfce/hero.interface';
import { Observable,of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';
  constructor(
    private messagerieService: MessageService,
    private http: HttpClient
    ){}

 /** GET heroes from the server */
 getHeroes(): Observable<HeroModel[]> {
  return this.http.get<HeroModel[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
}  getHero(id: number): Observable<HeroModel> {
    const hero = HEROES.find(h => h.id === id)!;
    this.messagerieService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messagerieService.add(`HeroService: ${message}`);
  }
}
}
