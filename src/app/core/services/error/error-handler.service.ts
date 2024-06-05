import { HttpErrorResponse } from '@angular/common/http'
import { ErrorHandler, Injectable } from '@angular/core'
import { MessageService } from 'primeng/api'
import { throwError } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
  constructor(private messageService: MessageService) {}

  public handleError(response: HttpErrorResponse) {
    switch (response.status) {
      case 409:
        this.messageService.add({
          severity: 'error',
          summary: 'Conflito',
          detail: response.error.message,
        })
        break
      case 404:
        // localStorage.clear()
        // location.reload()
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
      case 0:
        this.messageService.add({
          severity: 'info',
          summary: 'Erro 0',
          detail: 'Sem conexão com o servidor',
        })
        break
    }
    return throwError(() => new Error())
  }
}
