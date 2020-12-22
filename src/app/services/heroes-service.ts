import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://crud-firebase-angular-d76f3-default-rtdb.firebaseio.com';

  constructor( private http: HttpClient ) { }

  crearHeroe(heroe: HeroeModel): any {
      return this.http.post(`${this.url}/heroes.json`, heroe)
             .pipe(map((response: any) => {
               heroe.id = response.name;
               return heroe;
             }));
  }

  actualizarHeroe(heroe: HeroeModel): any {
    console.log('Actualizar heroe');
    const heroeTemp = {
      ...heroe
    };
    delete heroeTemp.id;
    console.log(heroe);
    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);
  }

  getHeroes(): any {
    return this.http.get(`${this.url}/heroes.json`)
          .pipe(map(response => this.crearArregloHeroes(response)));
  }

  getHeroe(id: string): any {
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  borrarHeroe(id: string): any {
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

  private crearArregloHeroes( heroesObj: object ): any {
    if ( heroesObj === null ) { return []; }
    const heroes: HeroeModel[] = [];
    Object.keys(heroesObj).forEach(key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;
      heroes.push(heroe);
    });
    return heroes;
  }
}
