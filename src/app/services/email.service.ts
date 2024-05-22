import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'https://localhost:7224/api/Clients/sendMail/';

  constructor(private http: HttpClient) { }

  sendEmail(to: string, subject: string, body: string): Observable<void> {
    const payload = { email: to };
    return this.http.post<void>(this.apiUrl + to, {});
  }
}
