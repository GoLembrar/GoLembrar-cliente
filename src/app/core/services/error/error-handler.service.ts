import { HttpErrorResponse } from '@angular/common/http'
import { ErrorHandler, Injectable } from '@angular/core'
import { MessageService } from 'primeng/api'
import { throwError } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
  private readonly errorHandlers: {
    [key: number]: (response: HttpErrorResponse) => void
  }

  constructor(private messageService: MessageService) {
    this.errorHandlers = {
      422: (response: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Erro ao validar senha',
          detail: response.error.message,
        })
      },
      409: (_response: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Conflito',
          detail: 'Email já cadastrado',
        })
      },
      404: (_response: HttpErrorResponse) => {
        // localStorage.clear()
        // location.reload()
      },
      403: (_response: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'info',
          summary: 'Erro',
          detail: 'Token expirou',
        })
        location.reload()
        localStorage.clear()
      },
      401: (_response: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Credenciais inválidas',
          detail: 'Email ou senha incorretos',
        })
      },
      0: (_response: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'info',
          summary: 'Erro 0',
          detail: 'Sem conexão com o servidor',
        })
      },
    }
  }

  public handleError(response: HttpErrorResponse) {
    const handler = this.errorHandlers[response.status]

    if (handler) handler(response)
    else
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Ocorreu um erro inesperado',
      })

    return throwError(() => new Error())
  }
}
