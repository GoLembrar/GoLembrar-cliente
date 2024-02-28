import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { MessageService } from 'primeng/api'
import { Observable, catchError, map, throwError } from 'rxjs'
import { environment } from 'src/environments/environment.development'
import { User } from '../models/user.model'
import { LoadingService } from './loading.service'
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private htpp: HttpClient,
    private router: Router,
    private messageService: MessageService,
    private loadingService: LoadingService
  ) {
    if (localStorage.getItem('Bearer')) {
      this.loginWithToken()
    }
  }

  messageError: string | null = null

  private isAuth = false

  getIsAuth() {
    return this.isAuth
  }

  loginWithToken() {
    this.isAuth = true
    this.router.navigate(['/'])
  }

  register(body: User): Observable<User> {
    this.loading(true)
    return this.htpp.post<User>(`${environment.apiUrl}/user`, body).pipe(
      catchError(this.handleError.bind(this)),
      map(success => success)
    )
  }

  login(body: User): Observable<User> {
    this.loading(true)
    return this.htpp.post<User>(`${environment.apiUrl}/auth`, body).pipe(
      catchError(this.handleError.bind(this)),
      map(success => {
        this.isAuth = true
        return success
      })
    )
  }

  loading(value: boolean): void {
    this.loadingService.setLoading(value)
  }

  navigateLogin(): void {
    setTimeout(() => {
      this.router.navigate(['login'])
    }, 2000)
  }

  navigateHome(): void {
    this.router.navigate([''])
  }

  setTokenLocalStorage(res: any): void {
    const { token } = res
    localStorage.setItem('Bearer', token)
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      this.messageService.add({
        severity: 'info',
        summary: 'Erro inesperado. Tente novamente mais tarde',
        detail: 'Via MessageService',
      })
    }
    if (error.status === 401) {
      this.messageService.add({
        severity: 'info',
        summary: 'Dados incorretos',
        detail: 'Via MessageService',
      })
    }
    if (error.status === 500) {
      this.messageService.add({
        severity: 'info',
        summary: 'Email já cadastrado',
        detail: 'Via MessageService',
      })
    }
    return throwError(() => this.messageError)
  }
}
