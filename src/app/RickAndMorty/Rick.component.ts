import { Component } from '@angular/core';
import { RickAndMortyService } from '../Services/rick-and-morty.service';

@Component({
  selector: 'app-rick',
  templateUrl: './Rick.component.html',
  styleUrl: './Rick.component.css',
})
export class RickComponent {
  title = 'RickAndMortyAPI';
  listaPersonajes: any[] = [];
  nextPage: string = '';
  prevPage: string = '';
  searchTerm: string = '';
  constructor(private rickService: RickAndMortyService) {}

  ngOnInit(): void {
    this.buscoPersonajes();
  }

  buscoPersonajes() {
    this.rickService.obtenerPersonajes().subscribe((data) => {
      this.actualizaPropiedades(data);
    });
  }

  irA(pagina: string) {
    this.rickService.irAPagina(pagina).subscribe((data) => {
      this.actualizaPropiedades(data);
    });
  }

  actualizaPropiedades(data: any) {
    this.listaPersonajes = data.results;
    this.nextPage = data.info.next;
    this.nextPage = '?' + this.nextPage.split('?')[1];
    if (data.info.prev != null) {
      this.prevPage = data.info.prev;
      this.prevPage = '?' + this.prevPage.split('?')[1];
    }
  }

  filtrarPersonajes(): void {
    if (this.searchTerm.trim() !== '') {
      this.rickService
        .filtrarPersonaje(this.searchTerm)
        .subscribe((data: any) => {
          this.listaPersonajes = data.results;
          this.actualizaPropiedades(data);
        });
    } else {
      this.cargarTodosPersonajes();
    }
  }

  cargarTodosPersonajes(): void {
    this.rickService.obtenerPersonajes().subscribe((data: any) => {
      this.listaPersonajes = data.results;
      this.actualizaPropiedades(data);
    });
  }
}
