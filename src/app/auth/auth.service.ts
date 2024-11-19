import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private apiUrl = environment.apiUrl; // Reemplaza con tu endpoint GraphQL

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const query = `
      query {
        login(email: "${email}", password: "${password}") {
          token
          user {
            id
            username
            email
          }
        }
      }
    `;
    return this.http.post<any>(this.apiUrl, { query });
  }
 


  



}


