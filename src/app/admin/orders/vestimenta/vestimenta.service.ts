import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VestimentaService {

  private apiUrl = environment.apiUrl; // Reemplaza con tu endpoint GraphQL

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    console.log(token, "dsdas");
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }



  getAllGarment(): Observable<any> {
    const query = {
       query: `query { getAllGarment { id name description basePrice image } }`
    };
    return this.http.post<any>(this.apiUrl, query, { headers: this.getHeaders() });
  }

  getGarment(id: string): Observable<any> {
    const query = {
      query: `query { getGarment(id: "${id}") { id name description basePrice image } }`
    };
    return this.http.post<any>(this.apiUrl, query, { headers: this.getHeaders() });
  }

  createGarment(name: string, description: string, basePrice: number, imageurl: string): Observable<any> {
    const mutation = {
      query: `mutation { createGarment(name: "${name}", description: "${description}", basePrice: ${basePrice}, image: "${imageurl}") { id name description basePrice image } }`
    };
    return this.http.post<any>(this.apiUrl, mutation, { headers: this.getHeaders() });
  }

  updateGarment(id: string, name: string, description: string, basePrice: number, imageurl: string): Observable<any> {
    const mutation = {
      query: `mutation { updateGarment(id: "${id}", name: "${name}", description: "${description}", basePrice: ${basePrice}, image: "${imageurl}") { id name description basePrice image } }`
    };
    return this.http.post<any>(this.apiUrl, mutation, { headers: this.getHeaders() }).pipe(
      
    );
  }

  deleteGarment(id: string): Observable<any> {
    const mutation = {
      query: `mutation { deleteGarment(id: "${id}") }`
    };
    return this.http.post<any>(this.apiUrl, mutation, { headers: this.getHeaders() });
  }
}
