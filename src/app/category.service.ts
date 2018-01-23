import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategoryService {
  observableCategories$: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.observableCategories$ = this.db.list('/categories', ref => ref.orderByChild('name')).snapshotChanges();
  }

  getCategories() {
    return this.observableCategories$;
  }

}
