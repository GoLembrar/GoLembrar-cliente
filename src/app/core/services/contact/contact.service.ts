import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { injectMutation, injectQuery } from '@ngneat/query'
import { map } from 'rxjs'
import { environment } from 'src/environments/environment.development'
import { Contact, EditContact } from '../../models/contact'

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}
  private query = injectQuery()
  private mutation = injectMutation()

  getContacts() {
    return this.query({
      queryKey: ['contacts'] as const,
      queryFn: () =>
        this.http
          .get<Contact[]>(`${environment.apiUrl}/contact`)
          .pipe(map(res => res)),
    }).result
  }

  search(searchValue: string) {
    if (!searchValue) {
      console.log('log 1 dentro do service de search')
      return undefined
    }

    console.log('log 2 dentro do service de search')
    return this.mutation({
      mutationKey: ['filteredContacts'],
      mutationFn: () =>
        this.http.post<Contact[]>(`${environment.apiUrl}/contact/search`, {
          name: searchValue,
        }),
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
