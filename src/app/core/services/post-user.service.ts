import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { URL_POST_USER } from '../constants/urlApi';

@Injectable({
  providedIn: 'root'
})
export class PostUserService {
  constructor(private htpp: HttpClient) { }

  createUser(body: any) {
    return this.htpp.post<any>(URL_POST_USER, body).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string = '';

    if(error.status === 0) {
      errorMessage = 'Erro inesperado. Tente novamente mais tarde.'
    }
    if(error.status >= 500) {
      errorMessage = 'Email já cadastrado.'
    }
    return throwError(errorMessage);
  }

}
