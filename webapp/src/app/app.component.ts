import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppStateService } from './services/app-state.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Everybody\'s Market';

  toggleBckDropSub!: Subscription;

  isBackDropOpen = false;

  constructor(public appstate: AppStateService, private router:Router){ }

  ngOnInit(): void {
    this.router.navigate(['homepage']);
    this.toggleBckDropSub = this.appstate.storeBackDropState.subscribe(data => {
          this.isBackDropOpen = data;
        },
        (err: Error) => {
          throw new Error(err.message);
        }
      );
  }

  ngOnDestroy(): void{
    this.toggleBckDropSub.unsubscribe();
  }


}
