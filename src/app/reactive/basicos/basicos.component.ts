import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styleUrls: ['./basicos.component.css']
})
export class BasicosComponent implements OnInit {

  // miFormulario: FormGroup = new FormGroup(
  //   {
  //     producto: new FormControl('PC escritorio'),
  //     precio: new FormControl(15200),
  //     existencias: new FormControl(2)
  //   }
  // )

  miFormulario: FormGroup = this.fb.group({
    // campo: [valor po defecto, validaciones sincrónicas, validaciones asincrónicas]
    producto: [null, [Validators.required, Validators.minLength(3)]],
    precio: [null, [Validators.required, Validators.min(0)]],
    existencias: [null, [Validators.required, Validators.min(0)]]
  })

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
    // inicializar solo algunos valores
    this.miFormulario.reset({
      producto: 'PC escritorio',
      precio: 15200
    })
  }

  campoNoValido( campo: string ) {
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched
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
