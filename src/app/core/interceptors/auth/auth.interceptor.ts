import { HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { catchError } from 'rxjs'
import { ErrorHandlerService } from '../../services/error/error-handler.service'

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userJwt = localStorage.getItem('Bearer')

  const errorHandlerService = inject(ErrorHandlerService)

  if (userJwt) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${userJwt}`,
      },
    })
  }
  return next(req).pipe(
    catchError(error => errorHandlerService.handleError(error))
  )
}
