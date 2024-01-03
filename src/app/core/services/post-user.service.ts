import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostUserService {

  createUser(body: any) {
    return this.htpp.post<any>('https://jsonplaceholder.typicode.com/posts', body)
  }

  constructor(private htpp: HttpClient) { }
}
