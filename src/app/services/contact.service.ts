import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';

const baseUrl = 'http://localhost:8080/api/v1/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

    getAll(): Observable<Contact[]> {
      return this.http.get<Contact[]>(baseUrl);
    }

    get(id: any): Observable<Contact> {
      return this.http.get<Contact>(`${baseUrl}/${id}`);
    }

    create(data: any): Observable<any> {
      return this.http.post(baseUrl, data);
    }

    update(id: any, data: any): Observable<any> {
      return this.http.put(`${baseUrl}/${id}`, data);
    }

    findByNameOrCodename(anyname: any): Observable<Contact[]> {
      return this.http.get<Contact[]>(`${baseUrl}?anyname=${anyname}`);
    }
}
