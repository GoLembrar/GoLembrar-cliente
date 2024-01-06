import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostUserService {

  createUser(body: any) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    })
    const options = {headers: headers}
    return this.htpp.post<any>('http://localhost:3000/user', body, options)
  }

  constructor(private htpp: HttpClient) { }
}
