import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { injectQuery } from '@ngneat/query'
import { environment } from 'src/environments/environment.development'
import { CreateReminder, Reminder } from '../../models/reminder'

@Injectable({
  providedIn: 'root',
})
export class ReminderService {
  constructor(private http: HttpClient) {}

  private query = injectQuery()

  create(reminder: CreateReminder) {
    return this.http.post(`${environment.apiUrl}/reminder`, reminder)
  }

  findAll() {
    return this.query({
      queryKey: ['reminders'] as const,
      queryFn: () => this.http.get<Reminder[]>('/assets/mocks/reminders.json'),
    }).result
  }
}
