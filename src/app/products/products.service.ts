import { Injectable } from '@angular/core';

import { EMPTY, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from './product.interface';

import { ApiService } from '../core/api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends ApiService {
  public createNewProduct(product: Product): Observable<Product> {
    if (!this.endpointEnabled('product')) {
      console.warn(
        'Endpoint "bff" is disabled. To enable change your environment.ts config',
      );
      return EMPTY;
    }

    const url = this.getUrl('product', 'products');
    return this.http.post<Product>(url, product);
  }

  public editProduct(id: string, changedProduct: Product): Observable<Product> {
    if (!this.endpointEnabled('product')) {
      console.warn(
        'Endpoint "bff" is disabled. To enable change your environment.ts config',
      );
      return EMPTY;
    }

    const url = this.getUrl('product', `products/${id}`);
    return this.http.put<Product>(url, changedProduct);
  }

  public getProductById(id: string): Observable<Product | null> {
    if (!this.endpointEnabled('product')) {
      console.warn(
        'Endpoint "bff" is disabled. To enable change your environment.ts config',
      );
      return this.http
        .get<Product[]>('/assets/products.json')
        .pipe(
          map(
            (products) => products.find((product) => product.id === id) || null,
          ),
        );
    }

    const url = this.getUrl('product', `products/${id}`);
    return this.http.get<Product>(url);
  }

  public getProducts(): Observable<Product[]> {
    if (!this.endpointEnabled('product')) {
      console.warn(
        'Endpoint "bff" is disabled. To enable change your environment.ts config',
      );
      return this.http.get<Product[]>('/assets/products.json');
    }

    const url = this.getUrl('product', 'products');
    return this.http.get<Product[]>(url);
  }

  public getProductsForCheckout(ids: string[]): Observable<Product[]> {
    if (!ids.length) {
      return of([]);
    }

    return this.getProducts().pipe(
      map((products) => products.filter((product) => ids.includes(product.id))),
    );
  }
}
