import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor( private heroesService: HeroesService,
               private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // Obtener parametro sin estar subscrito
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if ( id !== 'nuevo') {
      this.heroesService.getHeroe(id)
        .subscribe( (response: HeroeModel) => {
          this.heroe = response;
          this.heroe.id = id;
        });

    }
  }

  guardar(form: NgForm): void{
    if (form.invalid) {
      console.log('formulario no valido');
      return;
    }

    Swal.fire({
      title: 'Guardando información',
      text: 'Espere un momento',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if (this.heroe.id) {
      peticion = this.heroesService.actualizarHeroe(this.heroe);
    } else {
      peticion = this.heroesService.crearHeroe(this.heroe);
    }

    peticion.subscribe( response => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se insertó/actualizó correctamente',
        icon: 'success'
      });
    });
  }

}
