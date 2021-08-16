import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartDetails, ProductDetails } from 'src/app/models/data.model';
import { ApicommService } from 'src/app/services/apicomm.service';
import { AppStateService } from 'src/app/services/app-state.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {

  @Input() categoryId = '';

  products: ProductDetails[] = [];

  getProductsSubscription!: Subscription;

  addToCartSubscription!: Subscription;

  getQueryParamsSubscription!: Subscription;

  subscribeCartProdyctUpdateSubscription!: Subscription;

  constructor(
    public apicommService: ApicommService,
    public appState: AppStateService,
    private route: ActivatedRoute) { }


  ngOnInit(): void {

    this.getProductsSubscription = this.apicommService.getProducts()
      .subscribe((data: ProductDetails[]) => {
        this.products = data;
        const categoryId = this.route.snapshot.queryParams.category;
        if (categoryId !== undefined) {
          this.filterProductsByCategory(categoryId);
        }
      });

    this.getQueryParamsSubscription = this.route.queryParams
      .subscribe(
        (params: Params) => {
          const categoryID = params.category;
          this.filterProductsByCategory(categoryID);
        }
      );

    this.subscribeCartProdyctUpdateSubscription = this.appState.subscribeCartProdyctUpdate
      .subscribe(
        res => {
          this.products.forEach(product => {
            if (product.id === res) {
              product.inCart = false;
            }
          });

        },
        (err: Error) => {
          throw new Error(err.message);
        }
      );
  }

  filterProductsByCategory(categoryID: string): void {
    this.products.map(pD => {
      pD.visible = ((categoryID === pD.category || categoryID === undefined) ? true : false);
    });
  }

  addToCart(product: ProductDetails): void {
    this.addToCartSubscription = this.apicommService.addToCart(product.id)
      .subscribe(
        res => {
          console.log(res);
          let itemExist = false;
          let itemCounts = 0;
          this.appState.cartTotalCount = 0;
          this.appState.cartItemsCollection
            .forEach(item => {
              if (item.id === product.id) {
                item.itemCount++;
                itemExist = true;
              }
              itemCounts += item.itemCount;
              this.appState.cartTotalCount += item.price * item.itemCount;
            });
          if (!itemExist) {
            product.inCart = true;
            const cart: CartDetails = { ...product, itemCount: 1 };
            this.appState.cartItemsCollection.push(cart);
            itemCounts++;
            this.appState.cartTotalCount += product.price * 1;
          }
          this.appState.cartItemCount = itemCounts;
          this.addToCartSubscription.unsubscribe();
        },
        (err: Error) => {
          this.addToCartSubscription.unsubscribe();
          throw new Error(err.message);
        }
      );
  }

  ngOnDestroy(): void {
    this.getProductsSubscription.unsubscribe();
    this.getQueryParamsSubscription.unsubscribe();
    this.subscribeCartProdyctUpdateSubscription.unsubscribe();
  }

}
