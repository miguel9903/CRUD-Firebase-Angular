import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes-service';
import { HeroeModel } from '../../models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html'
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  loading: boolean;

  constructor( private heroesService: HeroesService ) { }

  ngOnInit(): void { 
    this.loading = true;
    this.heroesService.getHeroes()
         .subscribe(response => {
            console.log(response);
            this.heroes = response;
            this.loading = false;         
         });
  }

  borrarHeroe(heroe: HeroeModel, pos: number): void {
    Swal.fire({
      title: 'Eliminar heroe',
      text: `Está seguro de eliminar a ${heroe.nombre}?`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        this.heroes.splice(pos, 1);
        this.heroesService.borrarHeroe(heroe.id).subscribe();
      } 
    });
  } 
}