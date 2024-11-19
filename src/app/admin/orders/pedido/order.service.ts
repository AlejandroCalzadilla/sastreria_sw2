import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = environment.apiUrl; // Reemplaza con tu endpoint GraphQL

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getOrder(id: string): Observable<any> {
    const query = {
      query: `query { getOrder(id: "${id}") { id customerId orderDate status totalPrice orderItems { garmentId quantity price status images measurementData } } }`
    };
    return this.http.post<any>(this.apiUrl, query, { headers: this.getHeaders() });
  }

  getOrders(limit: number, offset: number): Observable<any> {
    const query = {
      query: `{ getOrders(limit: ${limit}, offset: ${offset}) { 
        items { 
          id 
          customerId 
          orderDate 
          status 
          totalPrice 
        } 
        total 
      } }`
    };
    return this.http.post<any>(this.apiUrl, query, { headers: this.getHeaders() });
  }

  





  createOrder(order: any): Observable<any> {
    const itemsString = order.items.map((item: any) => `{ garmentId: "${item.garmentId}", quantity: ${item.quantity}, price: ${item.price}, status: "${item.status}", measurementData: "${item.measurementData}" }`).join(', ');
    const mutation = {
      query: `mutation { createOrder(customerId: "${order.customerId}", orderDate: "${order.orderDate}", status: "${order.status}", totalPrice: ${order.totalPrice}, items: [${itemsString}]) { id customerId orderDate status totalPrice orderItems { garmentId quantity price status measurementData } } }`
    };
    return this.http.post<any>(this.apiUrl, mutation, { headers: this.getHeaders() });
  }

  updateOrder(order: any): Observable<any> {
    const itemsString = order.items.map((item: any) => `{ garmentId: "${item.garmentId}", quantity: ${item.quantity}, price: ${item.price}, status: "${item.status}", images: [${item.images.map((img: string) => `"${img}"`).join(', ')}], measurementData: "${item.measurementData}" }`).join(', ');
    const mutation = {
      query: `mutation { updateOrder(id: "${order.id}", customerId: "${order.customerId}", orderDate: "${order.orderDate}", status: "${order.status}", totalPrice: ${order.totalPrice}, items: [${itemsString}]) { id customerId orderDate status totalPrice orderItems { garmentId quantity price status images measurementData } } }`
    };
    return this.http.post<any>(this.apiUrl, mutation, { headers: this.getHeaders() });
  }

  deleteOrder(id: string): Observable<any> {
    const mutation = {
      query: `mutation { deleteOrder(id: "${id}") }`
    };
    return this.http.post<any>(this.apiUrl, mutation, { headers: this.getHeaders() });
  }
}
