import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IClient } from '../core/interfaces/client.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'https://localhost:7224/api/Clients';
  http = inject(HttpClient)

  xyz = [
    {
      "id": 1,
      "name": "abdullah",
      "phoneNumber": "string",
      "email": "user@example.com",
      "homeAddress": "string"
    },
    {
      "id": 2,
      "name": "string2",
      "phoneNumber": "string2",
      "email": "user@example1.com",
      "homeAddress": "string2"
    },
    {
      "id": 4,
      "name": "string4",
      "phoneNumber": "string4",
      "email": "user@example4.com",
      "homeAddress": "string4"
    }
  ]
  getClients(): Observable<IClient[]> {
    return this.http.get<IClient[]>(this.apiUrl);

  }

  createClient(client: IClient): Observable<IClient> {
    return this.http.post<IClient>(this.apiUrl, client);
  }

  updateClient(client: IClient): Observable<IClient> {
    return this.http.put<IClient>(`${this.apiUrl}/${client.id}`, client);
  }

  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
