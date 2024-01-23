import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { MessageService } from 'primeng/api'
import { catchError, throwError } from 'rxjs'
import { environment } from 'src/environments/environment.development'
import { User } from '../models/user.model'
@Injectable({
  providedIn: 'root',
})
export class authService {
  constructor(
    private htpp: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) {}

  messageError: string | null = null

  register(body: User) {
    return this.htpp
      .post<User>(`${environment.apiUrl}/user`, body)
      .pipe(catchError(this.handleError.bind(this)))
      .subscribe({
        next: success => {
          this.router.navigate(['login'])
        },
        error: err => this.handleError(err),
      })
  }

  login(body: User) {
    return this.htpp
      .post<User>(`${environment.apiUrl}/auth`, body)
      .pipe(catchError(this.handleError.bind(this)))
      .subscribe({
        next: bearer => this.setTokenLocalStorage(bearer),
        error: err => this.handleError(err),
      })
  }

  private setTokenLocalStorage(res: any) {
    const { token } = res
    localStorage.setItem('token', token)
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      this.messageService.add({
        severity: 'info',
        summary: 'Erro inesperado. Tente novamente mais tarde',
        detail: 'Via MessageService',
      })
      this.messageError = 'Erro inesperado. Tente novamente mais tarde'
    }
    if (error.status === 401) {
      this.messageService.add({
        severity: 'info',
        summary: 'Dados incorretos',
        detail: 'Via MessageService',
      })
      this.messageError = 'Dados incorretos'
    }
    if (error.status === 500) {
      this.messageService.add({
        severity: 'info',
        summary: 'Email já cadastrado',
        detail: 'Via MessageService',
      })
      this.messageError = 'Email já cadastrado'
    }
    return throwError(() => this.messageError)
  }
}
