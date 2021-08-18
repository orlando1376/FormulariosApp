import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styleUrls: ['./basicos.component.css']
})
export class BasicosComponent implements OnInit {

  @ViewChild('miFormulario') miFormulario!: NgForm;

  // valores para inicializar el formulario
  initForm = {
    precio: 0,
    existencias: 0
  }

  constructor() { }

  ngOnInit(): void {
  }

  nombreValido(): boolean {
    return this.miFormulario?.controls.producto?.invalid && this.miFormulario?.controls.producto?.touched;
  }

  precioValido(): boolean {
    return this.miFormulario?.controls.precio?.touched && this.miFormulario?.controls.precio?.value < 0;
  }

  existenciasValidas() {
    return this.miFormulario?.controls.existencias?.touched && this.miFormulario?.controls.existencias?.value < 0;
  }

  guardar() {
    console.log(this.miFormulario);

    // limpia el formulario y opcionalmente inicializar valores
    this.miFormulario.resetForm({
      precio: 0,
      existencias: 0
    });
  }
}
