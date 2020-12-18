import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://login-app-28d70-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) { }

  crearHeroe( heroe: HeroeModel): any {
    return this.http.post(`${this.url}/heroes.json`, heroe)
            .pipe(
              map( (response: any) => {
                heroe.id = response.name;
                return heroe;
              })
            );
  }

  actualizarHeroe( heroe: HeroeModel): any{

    const heroeTemp = {
      nombre: heroe.nombre,
      poder: heroe.poder,
      vivo: heroe.vivo
    };

    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);
  }

  eliminarHeroe(id: any): any{
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

  getHeroe(id: any): any{
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  getheroes(): any{
    return this.http.get(`${this.url}/heroes.json`)
                    .pipe(map(this.crearArreglo));
  }

  private crearArreglo(heroesObj: any): any{
    const heroes: HeroeModel[] = [];

    if (heroesObj === null) { return []; }

    Object.keys(heroesObj).forEach(key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;

      heroes.push(heroe);
    });

    return heroes;
  }
}
