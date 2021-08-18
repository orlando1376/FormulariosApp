import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidatorService } from 'src/app/shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    // campo: [valor po defecto, validaciones sincrónicas, validaciones asincrónicas]
    nombre: ['', [Validators.required, Validators.pattern(this.vs.nombreApellidoPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.vs.emailPattern)], [ this.ev ]],
    username: ['', [Validators.required, this.vs.noPuedeSerOrlo]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  }, {
    // validators del formgroup
    validators: [this.vs.camposIguales('password', 'password2') ]
  })

  get emailErrorMsg(): string {   
    const errors = this.miFormulario.get('email')?.errors;

    if (errors?.required) {
      return 'El email es requerido.';
    } else if (errors?.pattern) {
     return 'El valor ingresado no tiene formato de correo.'
    }  else if (errors?.emailUtilizado) {
     return 'El email ya fue utilizado.'
    }

    return '';
  }

  constructor( private fb: FormBuilder,
               private vs: ValidatorService,
               private ev: EmailValidatorService ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Orlando Franco',
      email: 'orlandof@gmail.com',
      password: '123456',
      password2: '123456',
    })
  }

  campoNoValido( campo: string ) {
    return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched;
  }

  crearUsuario() {
    console.log(this.miFormulario.valueChanges);
    this.miFormulario.markAllAsTouched();
  }
}
