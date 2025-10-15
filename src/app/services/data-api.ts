import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {
 private apiUrl = 'https://apipablo.online/api/';

  private products$ = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {}

  loadProducts(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => this.products$.next(data),
      error: (err) => console.error('❌ Error cargando productos:', err)
    });
  }

  getProducts(): Observable<any[]> {
    return this.products$.asObservable();
  }

  getProductById(idProductos: number): Observable<any> {
    const url = `${this.apiUrl}?idProductos=${idProductos}`;
    console.log('Buscando producto en:', url);
    return this.http.get<any>(url);
  }

  deleteProduct(idProductos: number): Observable<any> {
    const url = `${this.apiUrl}?idProductos=${idProductos}`;
    console.log('Eliminando producto en:', url);
    return this.http.delete(url, { responseType: 'text' });
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }

    updateProduct(id: number, product: any): Observable<any> {
    return this.http.put(this.apiUrl, {
      idProductos: id,
      nombreProductos: product.nombreProductos,
      descripcionProductos: product.descripcionProductos,
      cantidadProductos: product.cantidadProductos,
      fechaProductos: product.fechaProductos
    });
  }
}