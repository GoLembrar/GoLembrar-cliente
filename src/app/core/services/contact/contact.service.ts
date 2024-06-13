import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment.development'
import { Contact, EditContact } from '../../models/contact'

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}

  getContacts() {
    return this.http.get<Contact[]>(`${environment.apiUrl}/contact`)
  }

  createContact(contact: Contact) {
    return this.http.post<Contact>(`${environment.apiUrl}/contact`, contact)
  }

  edit(contact: EditContact, id: string) {
    return this.http.patch(`${environment.apiUrl}/contact/${id}`, contact)
  }

  deleteContact(contactId: string) {
    return this.http.delete(`${environment.apiUrl}/contact/${contactId}`)
  }
}
