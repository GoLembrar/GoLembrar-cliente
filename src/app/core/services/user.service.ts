import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment.development'
import { User } from '../models/user.model'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserInfo(id = 1): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/user/${id}`)
  }
}
