import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styleUrls: ['./dinamicos.component.css']
})
export class DinamicosComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    favoritos: this.fb.array([
      ['Tomb Raider', Validators.required],
      ['Invaders', Validators.required],
    ], Validators.required)    
  });

  nuevoFavorito: FormControl = this.fb.control('', Validators.required);

  get favoritosArr() {
    console.log(this.miFormulario.get('favoritos') as FormArray);
    return this.miFormulario.get('favoritos') as FormArray;
  }

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
  }

  campoNoValido( campo: string ) {
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched
  }

  agregarFavorito() {
    if (this.nuevoFavorito.invalid) {
      return;
    }

    // this.favoritosArr.push( new FormControl( this.nuevoFavorito.value, Validators.required ));
    this.favoritosArr.push( this.fb.control( this.nuevoFavorito.value, Validators.required ));
    this.nuevoFavorito.reset();
  }

  borrar( i: number ) {
    this.favoritosArr.removeAt(i);
  }

  guardar() {
    if ( this.miFormulario.invalid ) {
      // marcar que todos los campos fueron tocados para que se muestren los errores
      this.miFormulario.markAllAsTouched();
      return;
    }

    console.log(this.miFormulario.value);

    // inicializa el formulario
    this.miFormulario.reset();
  }

}
