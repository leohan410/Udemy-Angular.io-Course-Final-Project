import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { AppUser } from './../models/app-user';
import { ShoppingCartService } from './../shopping-cart.service';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from './../models/shopping-cart';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
    appUser: AppUser;
    cart$: Observable<ShoppingCart>;
    // shoppingCartItemCount: number;

    constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {
    }

    async ngOnInit() {
      this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
      this.cart$ = await this.shoppingCartService.getCart();
      // const cart$ = await this.shoppingCartService.getCart();
      // cart$.subscribe(cart => {
      //   this.shoppingCartItemCount = 0;
      //   for (const productId in cart.items) {
      //     this.shoppingCartItemCount += cart.items[productId].quantity;
      //   }
      // });
    }

    logout() {
      this.auth.logout();
    }
}
