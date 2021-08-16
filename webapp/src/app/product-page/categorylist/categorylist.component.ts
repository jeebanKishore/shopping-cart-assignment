import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategorySelection } from 'src/app/models/data.model';
import { ApicommService } from 'src/app/services/apicomm.service';

@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.component.html',
  styleUrls: ['./categorylist.component.css']
})
export class CategorylistComponent implements OnInit {

  @Output() categorySelected = new EventEmitter<string>();

  @Input() categories: CategorySelection[] = [];

  getCategoriesSubscription!: Subscription;

  constructor(public msService: ApicommService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCategoriesSubscription = this.msService.getCategories()
      .subscribe((data: CategorySelection[]) => {
        this.categories = data;
      });

    this.categorySelected = this.route.snapshot.queryParams.category;
  }

  toggleCategory(id: string): void{
    this.categorySelected.emit(id);
  }

  ngOnDestroy(): void{
    this.getCategoriesSubscription.unsubscribe();
  }

}
