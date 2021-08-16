import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BannerDetails, CategorySelection } from '../models/data.model';
import { ApicommService } from '../services/apicomm.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  categories: CategorySelection[] = [];

  categoriesSubscription!: Subscription;

  constructor(private apicommService: ApicommService) {
  }

  ngOnInit(): void {

    this.categoriesSubscription = this.apicommService.getCategories()
      .subscribe((data: CategorySelection[]) => {
        this.categories = data;
        const categoryData: CategorySelection[] = this.categories.map(cat => ({
          ...cat,
          key: `Explore  ${cat.key}`
        }));
        this.categories = categoryData;
      });
  }

  ngOnDestroy(): void{
    this.categoriesSubscription.unsubscribe();
  }

}
