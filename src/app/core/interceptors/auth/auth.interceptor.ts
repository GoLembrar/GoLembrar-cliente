import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { catchError, switchMap, throwError } from 'rxjs'
import { AuthService } from '../../services/auth.service'
import { ErrorHandlerService } from '../../services/error/error-handler.service'

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const errorHandlerService = inject(ErrorHandlerService)
  const bearer = authService.getTokens()

  if (!req.url.includes('/auth/refresh'))
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${bearer.token}`,
      },
    })

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (
        authService.getIsAuth() &&
        error.status === 401 &&
        !req.url.includes('/auth/refresh')
      )
        return authService.refreshToken().pipe(
          switchMap(() => {
            return next(req)
          }),
          catchError(refreshError => {
            // If refreshToken is expired do the logout of user
            if (!authService.isTokenExpired(bearer.refreshToken))
              authService.logout()

            return errorHandlerService.handleError(refreshError)
          })
        )

      return throwError(() => new Error('Request failed.'))
    })
  )
}
