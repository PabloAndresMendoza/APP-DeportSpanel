import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

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

  updateProduct(idProductos: number, product: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}?idProductos=${idProductos}`, product);
  }

  getProductById1(idProductos: number): Observable<any> {
    const url = `${this.apiUrl}?idProductos=${idProductos}`;
    return this.http.get<any>(url).pipe(
      map((res: any) => Array.isArray(res) ? res[0] : res)
    );
  }
}