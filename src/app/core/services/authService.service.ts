import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, throwError } from 'rxjs'
import { environment } from 'src/environments/environment.development'
import { User } from '../models/user.model'
@Injectable({
  providedIn: 'root',
})
export class authService {
  constructor(private htpp: HttpClient) {}

  createUser(body: User) {
    return this.htpp
      .post<User>(`${environment.apiUrl}/user`, body)
      .pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string = ''

    if (error.status === 0) {
      errorMessage = 'Erro inesperado. Tente novamente mais tarde.'
    }
    if (error.status >= 500) {
      errorMessage = 'Email já cadastrado.'
    }
    return throwError(() => errorMessage)
  }
}
