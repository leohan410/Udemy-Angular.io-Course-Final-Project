import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];
  constructor(public itemsMap: {[productId: string]: ShoppingCartItem}) {
    this.itemsMap = itemsMap || {};

    for (const productId in itemsMap) {
      const item = itemsMap[productId];
      this.items.push(new ShoppingCartItem({ ...item, key: productId}));
    }
  }

  get productIds() {
    return Object.keys(this.items);
  }

  getQuantity(product: Product) {
    const item = this.itemsMap[product.key];
    // return a reference of that shopping cart item
    return item ? item.quantity : 0;
  }

  get totalItemsCount() {
    let count = 0;
    for (const productId in this.items)
      count += this.items[productId].quantity;
    return count;
  }

  get totalPrice(){
    let sum = 0;
    for (const productId in this.items)
      sum += this.items[productId].totalPrice;
    return sum;
  }
}
