import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartDetails } from '../models/data.model';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  cartOpenState = false;
  cartItemCount = 0;
  cartTotalCount = 0;

  subscribetoOpenCart = new Subject<boolean>();
  updateCartItem = new Subject<number>();
  subscribeCartProdyctUpdate = new Subject<string>();
  storeBackDropState = new Subject<boolean>();
  cartItemsCollection: CartDetails[] = [];


  constructor() { }
}
