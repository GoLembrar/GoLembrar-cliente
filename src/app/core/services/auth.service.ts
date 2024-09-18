import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { injectQuery } from '@ngneat/query'
import { MessageService } from 'primeng/api'
import { map, Observable } from 'rxjs'
import { environment } from 'src/environments/environment.development'
import { JwtPayload } from '../models/jwt-payload'
import { Token } from '../models/token'
import { User, UserInfo, UserLogin } from '../models/user.model'
import { LoadingService } from './loading.service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  messageError: string | null = null

  private isAuth = false
  private query = injectQuery()

  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService,
    private loadingService: LoadingService
  ) {
    this.verifyToken()
  }

  getUserInfo() {
    return this.query({
      queryKey: ['userInfo'],
      queryFn: () => this.http.get<UserInfo>(`${environment.apiUrl}/user`),
    }).result
  }

  verifyToken() {
    if (this.getTokens().token) this.loginWithToken()
  }

  ifIsAuthLogin() {
    if (this.isAuth) this.router.navigateByUrl('/')
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

  getTokens() {
    const token = localStorage.getItem('Bearer') ?? ''
    const refreshToken = localStorage.getItem('RefreshBearer') ?? ''

    return { token, refreshToken }
  }

  setTokens(bearer: Token) {
    localStorage.setItem('Bearer', bearer.token)
    localStorage.setItem('RefreshBearer', bearer.refreshToken)
  }

  login(account: UserLogin): Observable<void> {
    return this.http
      .post<Token>(`${environment.apiUrl}/auth`, account, {
        withCredentials: true,
      })
      .pipe(
        map(bearer => {
          this.isAuth = true
          this.router.navigate(['/'])
          this.setTokens(bearer)
        })
      )
  }

  refreshToken() {
    if (this.isTokenExpired(this.getTokens().refreshToken)) this.logout()

    return this.http
      .get<Token>(`${environment.apiUrl}/auth/refresh`, {
        headers: {
          Authorization: `Bearer ${this.getTokens().refreshToken}`,
        },
      })
      .pipe(
        map(bearer => {
          this.isAuth = true
          this.setTokens(bearer)
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

  getJwtPayload(token: string) {
    const jwtPayload = window.atob(token.split('.')[1] || '')
    return JSON.parse(jwtPayload) as JwtPayload
  }

  isTokenExpired(token: string) {
    const parsedToken = this.getJwtPayload(token)
    const currentTime = Math.floor(Date.now() / 1000)
    return currentTime >= parsedToken.exp
  }
}
