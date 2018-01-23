import { Component, OnInit, OnDestroy,  } from '@angular/core';
import { ProductService } from './../../product.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Product } from './../../models/product';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;

  rows = [];
  columns = [];
  loadingIndicator = true;
  reorderable = true;

  constructor(private productService: ProductService) {

    this.subscription = this.productService.getAll()
    .map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val()}));
    })
    // .subscribe(products => this.filteredProducts = this.products = products);
    .subscribe(products => {
      this.products = products;

      this.rows = products;
      setTimeout(() => { this.loadingIndicator = false; }, 1500);
    });
  }

  filter(query: string) {
    const q = query.toLowerCase();
    const filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(q)) :
      this.products;

    this.rows = filteredProducts;
  }


  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
