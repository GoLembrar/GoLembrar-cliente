import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor() {}

  private loading = new BehaviorSubject<boolean>(false)

  get loading$(): Observable<boolean> {
    return this.loading.asObservable()
  }

  setLoading(value: boolean): void {
    this.loading.next(value)
  }
}
