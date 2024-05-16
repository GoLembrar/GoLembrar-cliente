import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment.development'
import { Contact } from '../../models/contact'

@Injectable({
  providedIn: 'root',
})
export class AddContactService {
  constructor(private http: HttpClient) {}

  getContacts() {
    return this.http.get<Contact[]>(`${environment.apiUrl}/contact`)
  }

  createContact(contact: Contact) {
    return this.http.post<Contact>(`${environment.apiUrl}/contact`, contact)
  }

  editContact(contact: Contact, userId: string) {
    return this.http.patch<Contact>(
      `${environment.apiUrl}/contact/${userId}`,
      contact
    )
  }

  deleteContact(userId: string) {
    return this.http.delete(`${environment.apiUrl}/contact/${userId}`)
  }
}
