import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CategoryService } from './../../category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  categories$: Observable<any[]>;
  @Input('category') category;

  constructor(
  private categoryService: CategoryService) {
    this.categories$ = this.categoryService.getCategories();
  }
}
