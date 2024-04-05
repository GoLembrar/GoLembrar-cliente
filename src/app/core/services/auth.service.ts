import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { MessageService } from 'primeng/api'
import { Observable, catchError, map, throwError } from 'rxjs'
import { environment } from 'src/environments/environment.development'
import { User, UserLogin } from '../models/user.model'
import { LoadingService } from './loading.service'
import { Token } from '../models/token'

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

  ifIsAuthLogin() {
    if (this.isAuth) {
      this.router.navigate(['/'])
    }
  }

  getIsAuth() {
    return this.isAuth
  }

  loginWithToken() {
    this.isAuth = true
  }

  register(body: User): Observable<User> {
    this.loading(true)
    return this.htpp.post<User>(`${environment.apiUrl}/user`, body).pipe(
      catchError(this.handleError.bind(this)),
      map(success => success)
    )
  }

  login(account: UserLogin): Observable<void> {
    this.loading(true)
    return this.htpp.post<Token>(`${environment.apiUrl}/auth`, account).pipe(
      catchError(this.handleError.bind(this)),
      map(bearer => {
        this.isAuth = true
        this.router.navigate(['/'])
        localStorage.setItem('Bearer', bearer.token)
      })
    )
  }

  logout() {
    this.setNotAuth()
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

  setTokenLocalStorage(bearer: Token) {
    localStorage.setItem('Bearer', bearer.token)
  }

  setNotAuth() {
    this.isAuth = false
    localStorage.clear()
    this.router.navigate(['/login'])
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
        severity: 'error',
        summary: 'Erro de conflito',
        detail: 'Esse email já foi cadastrado',
      })
    }
    return throwError(() => this.messageError)
  }
}
