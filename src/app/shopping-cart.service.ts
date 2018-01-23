import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Product } from './models/product';
import { ShoppingCart } from './models/shopping-cart';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges()
    .map(x => new ShoppingCart(x.items));
  }

  async addToCart(product: Product) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.key);
    item$.valueChanges().take(1).subscribe(item => {
        item$.update({
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: item ? item['quantity'] + 1 : 1});
    });
  }

  async removeFromCart(product: Product) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.key);
    item$.valueChanges().take(1).subscribe(item => {
      const quantity = item ? item['quantity'] - 1 : 0;
      if (quantity === 0) item$.remove();
      else item$.update({
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: quantity});
    });
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }


  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  // async + await for promise
  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cardId');
    if (cartId) { return cartId; }

    const result = await this.create();
    localStorage.setItem('cardId', result.key);
    return result.key;
  }
}
