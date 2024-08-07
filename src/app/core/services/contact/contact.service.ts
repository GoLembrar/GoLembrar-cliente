import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { injectQuery } from '@ngneat/query'
import { map } from 'rxjs'
import { environment } from 'src/environments/environment.development'
import { Contact, EditContact } from '../../models/contact'

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}
  private query = injectQuery()

  getContacts() {
    return this.query({
      queryKey: ['contacts'] as const,
      queryFn: () =>
        this.http
          .get<Contact[]>(`${environment.apiUrl}/contact`)
          .pipe(map(res => res)),
    }).result
  }

  createContact(contact: Contact) {
    return this.http.post<Contact>(`${environment.apiUrl}/contact`, contact)
  }

  edit(contact: EditContact, id: string) {
    return this.http.patch(`${environment.apiUrl}/contact/${id}`, contact)
  }

  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/contact/${id}`)
  }
}
