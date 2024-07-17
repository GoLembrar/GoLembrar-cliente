import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { injectQuery } from '@ngneat/query'
import { environment } from 'src/environments/environment.development'
import { CreateReminder, Reminder } from '../../models/reminder'

@Injectable({
  providedIn: 'root',
})
export class ReminderService {
  private http = inject(HttpClient)
  private router = inject(Router)
  private query = injectQuery()

  create(reminder: CreateReminder) {
    return this.http.post(`${environment.apiUrl}/reminder`, reminder)
  }

  findAll() {
    return this.query({
      queryKey: ['reminders'] as const,
      queryFn: () =>
        this.http.get<Reminder[]>(`http://localhost:3002/reminder`),
    }).result
  }

  findOne(id: number) {
    return this.query({
      queryKey: ['reminder'] as const,
      queryFn: () =>
        this.http.get<Reminder>(`http://localhost:3002/reminder/${id}`),
    }).result
  }

  edit(id: number) {
    this.router.navigateByUrl(`/edit/${id}`)
  }
}
