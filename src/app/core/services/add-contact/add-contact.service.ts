import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../../models/contact';

@Injectable({
  providedIn: 'root'
})
export class AddContactService {

  constructor(
    private http: HttpClient
  ) { }

  createContact(body: Contact): Observable<Contact> {
    return this.http.post<Contact>("../../assets/mocks/contacts.json", body)
  }

  getContacts(): Observable<Contact> {
    return this.http.get<Contact>("../../assets/mocks/contacts.json")
  }
}
