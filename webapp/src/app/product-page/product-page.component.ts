import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategorySelection } from '../models/data.model';
import { ApicommService } from '../services/apicomm.service';

@Component({
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  categorySelected = '';

  categories: CategorySelection[] = [];

  getCategoriesSubscription!: Subscription;

  constructor(public apicommService: ApicommService) { }

  ngOnInit(): void {
    this.getCategoriesSubscription = this.apicommService.getCategories()
      .subscribe((data: CategorySelection[]) => {
        this.categories = data;
      });
  }

  getCategory(event: string): void{
    console.log(event);
    this.categorySelected = event;
  }

  ngOnDestroy(): void {
    this.getCategoriesSubscription.unsubscribe();
  }

}
