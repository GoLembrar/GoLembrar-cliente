import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { UserEdit } from '../../models/user.model'
import { environment } from '../../../../environments/environment.development'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) {
  }

  updateProfile(profile: UserEdit) {
    return this.http.patch(`${environment.apiUrl}/user`, profile)
  }
}
