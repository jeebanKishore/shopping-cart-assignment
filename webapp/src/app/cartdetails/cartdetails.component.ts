import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { CartDetails } from '../models/data.model';
import { AppStateService } from '../services/app-state.service';

@Component({
  selector: 'app-cartdetails',
  templateUrl: './cartdetails.component.html',
  styleUrls: ['./cartdetails.component.css']
})
export class CartdetailsComponent implements OnInit {

  showFiller = false;

  @ViewChild('drawer') public drawer!: MatDrawer;

  subscribetoOpenCartscription!: Subscription;

  constructor(public appStateService: AppStateService) { }

  ngOnInit(): void {
    this.subscribetoOpenCartscription = this.appStateService.subscribetoOpenCart
      .subscribe(
        res => {
          this.toggleDrawer();
        },
        (err: Error) => {
          throw new Error(err.message);
        }
      );
  }

  toggleDrawer(): void{
    this.appStateService.cartOpenState = !this.appStateService.cartOpenState;
    this.drawer.toggle();
    this.appStateService.storeBackDropState.next(this.appStateService.cartOpenState);
  }

  removeItem(item: CartDetails): void{
    if (item.itemCount === 1){
      this.appStateService.cartItemsCollection = this.appStateService.cartItemsCollection.filter(itm => itm.id !== item.id);
      this.appStateService.subscribeCartProdyctUpdate.next(item.id);
    }
    else{
      item.itemCount--;
    }
    this.appStateService.cartItemCount--;
    this.appStateService.cartTotalCount -= item.price;
  }

  addItem(item: CartDetails): void{
    item.itemCount++;
    this.appStateService.cartItemCount++;
    this.appStateService.cartTotalCount += item.price;
  }

  ngOnDestroy(): void{
    this.subscribetoOpenCartscription.unsubscribe();
  }

}
