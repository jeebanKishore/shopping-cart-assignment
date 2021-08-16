import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../services/app-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public appStateService: AppStateService) {
  }

  ngOnInit(): void {
  }

  openCart(): void{
    this.appStateService.subscribetoOpenCart.next(true);
  }


}
