import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ControlContainer, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService  implements AsyncValidator {

  constructor( private http: HttpClient ) { }

  validate( control: AbstractControl ): Observable<ValidationErrors | null> {
    
    const email = control.value;    

    return this.http.get<any[]>(`http://localhost:3000/usuarios?q=${ email }`)
      .pipe(
        // delay(3000), // lo utilizo para poder simular que la petisión se demora y el formulario queda en pending
        map( resp => {
          return ( resp.length === 0 ? null : { emailUtilizado: true })
        })
      );
  }
}
