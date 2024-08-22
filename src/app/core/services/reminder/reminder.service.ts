import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { injectQuery } from '@ngneat/query'
import { environment } from 'src/environments/environment.development'
import { CreateReminder, Reminder, UpdateReminder } from '../../models/reminder'

@Injectable({
  providedIn: 'root',
})
export class ReminderService {
  private http = inject(HttpClient)
  private router = inject(Router)
  private query = injectQuery()

  findOne(id: string) {
    return this.query({
      queryKey: ['reminder', id] as const,
      queryFn: () =>
        this.http.get<Reminder>(`${environment.apiUrl}/reminder/${id}`),
    })
  }

  create(reminder: CreateReminder) {
    return this.http.post(`${environment.apiUrl}/reminder`, reminder)
  }

  findAll() {
    return this.query({
      queryKey: ['reminders'] as const,
      queryFn: () =>
        this.http.get<Reminder[]>(`${environment.apiUrl}/reminder`),
    }).result
  }

  edit(id: string) {
    this.router.navigateByUrl(`/edit/${id}`)
  }

  update(updateReminder: UpdateReminder, id: string) {
    return this.http.patch(
      `${environment.apiUrl}/reminder/${id}`,
      updateReminder
    )
  }

  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/reminder/${id}`)
  }
}
