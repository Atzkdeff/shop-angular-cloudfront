import { computed, Injectable, signal } from '@angular/core';

import { Product } from '../products/product.interface';
import { ApiService } from '../core/api.service';

@Injectable({
  providedIn: 'root',
})
export class CartService extends ApiService {
  /** Key - item id, value - ordered amount */
  #cart = signal<Record<string, number>>({});

  cart = this.#cart.asReadonly();

  totalInCart = computed(() => {
    const values = Object.values(this.cart());

    if (!values.length) {
      return 0;
    }

    return values.reduce((acc, val) => acc + val, 0);
  });

  addItem(id: string): void {
    if (!this.endpointEnabled('cart')) {
      console.warn(
        'Endpoint "bff" is disabled. To enable change your environment.ts config',
      );
      return undefined;
    }

    const url = this.getUrl('cart', '');

    this.http
      .put<Product>(url, { cartItems: [{ product_id: id, count: 42 }] })
      .subscribe();
  }

  removeItem(id: string): void {
    this.updateCount(id, -1);
  }

  empty(): void {
    this.#cart.set({});
  }

  private updateCount(id: string, type: 1 | -1): void {
    const val = this.cart();
    const newVal = {
      ...val,
    };

    if (!(id in newVal)) {
      newVal[id] = 0;
    }

    if (type === 1) {
      newVal[id] = ++newVal[id];
      this.#cart.set(newVal);
      return;
    }

    if (newVal[id] === 0) {
      console.warn('No match. Skipping...');
      return;
    }

    newVal[id]--;

    if (!newVal[id]) {
      delete newVal[id];
    }

    this.#cart.set(newVal);
  }
}
