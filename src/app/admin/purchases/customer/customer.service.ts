import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = environment.apiUrl; // Replace with your GraphQL endpoint

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    console.log(token ,"dsdas");
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }


  findAllCustomers(): Observable<any> {
    const query = `
      query {
        findAllCustomers {
          id
          firstName
          lastName
          ci
          birthDate
          sex
          telephones {
            number
            type
          }
        }
      }
    `;
    return this.http.post<any>(this.apiUrl, { query }, { headers: this.getHeaders() });
  }

  findCustomerById(id: string): Observable<any> {
    const query = `
      query {
        findCustomerById(id: "${id}") {
          id
          firstName
          lastName
          ci
          birthDate
          sex
          telephones {
            number
            type
          }
        }
      }
    `;
    return this.http.post<any>(this.apiUrl, { query }, { headers: this.getHeaders() });
  }

  createCustomer(customer: any): Observable<any> {

    console.log(customer, "customer todo completo");
    const telephonesString = customer.telephones.map((phone: any) => `{ number: "${phone.number}", type: "${phone.type}" }`).join(', ');
    const mutation = `
      mutation {
        createCustomer(firstName: "${customer.firstName}", lastName: "${customer.lastName}", ci: "${customer.ci}", birthDate: "${customer.birthDate}", sex: "${customer.sex}", telephones: [${telephonesString}]) {
          id
          firstName
          lastName
          ci
          birthDate
          sex
          telephones {
            number
            type
          }
        }
      }
    `;
    return this.http.post<any>(this.apiUrl, { query: mutation }, { headers: this.getHeaders() });
  }

  updateCustomer(customer: any): Observable<any> {
   
    console.log(customer, "customer todo completo");
    const telephonesString = customer.telephones.map((phone: any) => `{ number: "${phone.number}", type: "${phone.type}" }`).join(', ');
    const mutation = `
      mutation {
        updateCustomer(id:"${customer.id}", firstName: "${customer.firstName}", lastName: "${customer.lastName}", ci: "${customer.ci}", birthDate: "${customer.birthDate}", sex: "${customer.sex}", telephones: [${telephonesString}]) {
          id
          firstName
          lastName
          ci
          birthDate
          sex
          telephones {
            number
            type
          }
        }
      }
    `;
    return this.http.post<any>(this.apiUrl, { query: mutation });
  }

  deleteCustomer(id: string): Observable<any> {
    const mutation = `
      mutation {
        deleteCustomer(id: "${id}") 
      }
    `;
    return this.http.post<any>(this.apiUrl, { query: mutation }).pipe(
      tap((response: any) => console.log('Respuesta del servidor:', response))
    );;
  }
}
