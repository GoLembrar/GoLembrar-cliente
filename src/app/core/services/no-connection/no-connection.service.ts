import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class NoConnectionService {
  constructor(private router: Router) {}

  isVerifyConnection() {
    window.addEventListener('offline', () => {
      this.router.navigateByUrl('/no-connection')
    })
    window.addEventListener('online', () => {
      this.router.navigateByUrl('/')
    })
  }
}
