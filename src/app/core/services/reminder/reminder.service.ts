import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment.development'
import { Reminder } from '../../models/reminder'

@Injectable({
  providedIn: 'root',
})
export class ReminderService {
  constructor(private http: HttpClient) {}

  create(reminder: Reminder) {
    return this.http.post(`${environment.apiUrl}/reminder`, reminder)
  }
}
