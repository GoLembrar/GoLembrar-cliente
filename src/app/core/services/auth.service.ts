import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { MessageService } from 'primeng/api'
import { Observable, map } from 'rxjs'
import { environment } from 'src/environments/environment.development'
import { JwtPayload } from '../models/jwt-payload'
import { Token } from '../models/token'
import { User, UserLogin } from '../models/user.model'
import { LoadingService } from './loading.service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  messageError: string | null = null

  private isAuth = false

  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService,
    private loadingService: LoadingService
  ) {
    this.verifyToken()
  }

  verifyToken() {
    if (localStorage.getItem('Bearer')) {
      this.loginWithToken()
    }
  }

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
    return this.http.post<User>(`${environment.apiUrl}/user`, body)
  }

  login(account: UserLogin): Observable<void> {
    this.loading(true)
    return this.http.post<Token>(`${environment.apiUrl}/auth`, account).pipe(
      map(bearer => {
        this.isAuth = true
        this.router.navigate(['/'])
        localStorage.setItem('Bearer', bearer.token)
      })
    )
  }

  logout() {
    this.setNotAuth()
    this.messageService.add({
      severity: 'info',
      summary: 'Sucesso',
      detail: 'Saiu na conta',
    })
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

  getJwtPayload() {
    const jwtPayload = window.atob(
      localStorage.getItem('Bearer')?.split('.')[1] || ''
    )
    return JSON.parse(jwtPayload) as JwtPayload
  }
}
