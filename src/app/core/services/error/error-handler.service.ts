import { ErrorHandler, Injectable } from '@angular/core'
import { HttpErrorResponse } from '@angular/common/http'
import { throwError } from 'rxjs'
import { MessageService } from 'primeng/api'

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
  constructor(private messageService: MessageService) {}

  public handleError(response: HttpErrorResponse) {
    switch (response.status) {
      case 0:
        this.messageService.add({
          severity: 'info',
          summary: 'Erro 0',
          detail: 'Sem conexão com o servidor',
        })
        break
      case 409:
        this.messageService.add({
          severity: 'error',
          summary: 'Conflito',
          detail: response.error.message,
        })
        break
      case 404:
        localStorage.clear()
        location.reload()
        break
      case 403:
        this.messageService.add({
          severity: 'info',
          summary: 'Erro',
          detail: 'Token expirou',
        })
        location.reload()
        localStorage.clear()
        break
      case 401:
        this.messageService.add({
          severity: 'error',
          summary: 'Credenciais inválidas',
          detail: 'Email ou senha incorretos',
        })
        break
    }
    return throwError(() => new Error())
  }
}
