import { Component, Input, OnInit } from '@angular/core';
import { CategorySelection } from 'src/app/models/data.model';

@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.component.html',
  styleUrls: ['./categorylist.component.css']
})
export class CategorylistComponent implements OnInit {

  @Input() category!: CategorySelection;

  @Input() isEven!: boolean;

  constructor() {
   }

  ngOnInit(): void {
  }
}
