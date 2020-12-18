import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css']
})
export class HerosComponent implements OnInit {

  heroes: HeroeModel[] = [];
  cargando = false;
  registros = false;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.heroesService.getheroes().subscribe( (response: HeroeModel[]) => {
      this.cargando = false;
      this.heroes = response;

    });
  }

  eliminarHeroe(heroe: HeroeModel, i: number): void{

    Swal.fire({
      title: `Desea eliminar ${heroe.nombre}?`,
      text: 'No se podrá recuperar!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.heroes.splice(i, 1);
        this.heroesService.eliminarHeroe(heroe.id).subscribe();
        Swal.fire(
          'Eliminado!',
          `Ha eliminado a ${heroe.nombre}`,
          'success'
        );
      }
    });

  }
}
