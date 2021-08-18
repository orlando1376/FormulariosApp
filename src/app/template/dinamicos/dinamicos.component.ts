import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Persona {
  nombre: string;
  favoritos: Favorito[];
}

interface Favorito {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styleUrls: ['./dinamicos.component.css']
})
export class DinamicosComponent implements OnInit {

  @ViewChild('miFormulario') miFormulario!: NgForm;

  nuevoJuego: string = '';

  persona: Persona = {
    nombre: 'Orlando',
    favoritos: [
      {id: 1, nombre: 'Invader'},
      {id: 2, nombre: 'Tomb Rider'},
    ]
  }
  constructor() { }

  ngOnInit(): void {
  }

  nombreValido(): boolean {
    return this.miFormulario?.controls.nombre?.invalid && this.miFormulario?.controls.nombre?.touched;
  }
  
  guardar() {
    console.log('Guardar...');
  }

  eliminar( index: number ) {
    this.persona.favoritos.splice(index, 1);
  }

  agregarJuego() {
  if (!this.nuevoJuego) {
    return;
  }

    const nuevo: Favorito = {
      id: this.persona.favoritos.length + 1,
      nombre: this.nuevoJuego
    }

    this.persona.favoritos.push( {...nuevo} );
    this.nuevoJuego = '';
  }
}
