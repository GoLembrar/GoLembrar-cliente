import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Contact } from '../../models/contact'

@Injectable({
  providedIn: 'root',
})
export class AddContactService {
  constructor(private http: HttpClient) {}

  createContact(body: Contact): Observable<Contact> {
    return this.http.post<Contact>('../../assets/mocks/contacts.json', body)
  }

  editContact(body: Contact, id: string): Observable<Contact> {
    // return this.http.put<Contact>(`../../assets/mocks/contacts.json`, body)
    return new Observable(observer => {
      observer.next(body)
      observer.complete()
    })
  }

  deleteContact(id: string) {
    return this.http.delete('../../assets/mocks/contacts.json')
  }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>('../../assets/mocks/contacts.json')
  }
}
