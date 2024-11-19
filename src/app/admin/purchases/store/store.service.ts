import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private apiUrl = environment.apiUrl; // Reemplaza con tu endpoint GraphQL

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }


  findAllStores(): Observable<any> {
    const query = `
      query {
        findAllStore {
          id
          name
          address
        }
      }
    `;
    return this.http.post<any>(this.apiUrl, { query },{ headers: this.getHeaders() });
  }

  findStoreById(id: string): Observable<any> {
    const query = `
      query {
        findStoreById(id: "${id}") {
          id
          name
          address
        }
      }
    `;
    return this.http.post<any>(this.apiUrl, { query }, { headers: this.getHeaders() });
  }

  createStore(store: any): Observable<any> {
    const mutation = `
      mutation {
        createStore(name: "${store.name}", address: "${store.address}") {
          id
          name
          address
        }
      }
    `;
    return this.http.post<any>(this.apiUrl, { query: mutation }, { headers: this.getHeaders() }).pipe(
      tap((response: any) => console.log('Respuesta del servidor:', response))
    );;
  }

  updateStore(store: any): Observable<any> {
    const mutation = `
      mutation {
        updateStore(id: "${store.id}", name: "${store.name}", address: "${store.address}") {
          id
          name
          address
        }
      }
    `;
    return this.http.post<any>(this.apiUrl, { query: mutation }, { headers: this.getHeaders() });
  }

  deleteStore(id: string): Observable<any> {
    const mutation = `
      mutation {
        deleteStore(id: "${id}")
      }
    `;
    return this.http.post<any>(this.apiUrl, { query: mutation }, { headers: this.getHeaders() }).pipe(
      tap((response: any) => console.log('Respuesta del servidor:', response))
    );
  }

}
