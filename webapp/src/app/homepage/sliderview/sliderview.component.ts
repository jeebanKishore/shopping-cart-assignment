import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of, Subject, Subscription, timer } from 'rxjs';
import { BannerDetails } from 'src/app/models/data.model';
import { ApicommService } from 'src/app/services/apicomm.service';
import { filter, map, switchMap, take, takeUntil, tap } from "rxjs/operators";
@Component({
  selector: 'app-sliderview',
  templateUrl: './sliderview.component.html',
  styleUrls: ['./sliderview.component.css']
})
export class SliderviewComponent implements OnInit {
  bannersSubscription!: Subscription;
  // It can be convenient to combine everything the view needs into
  // a single imageCollector$ observable.  This also solves the problem with
  // ngIf hiding the element when the index value equals zero.
  imageCollector$!: Observable<{ currentIndex: number; imageUrls: BannerDetails[];}>
  private caraousalData: BannerDetails[] = [];
  private touchStartPoint: number = 0;
  private selectedIndexSubject = new BehaviorSubject<number>(0);
  private stopSubject = new Subject<boolean>();
  private stopSubject$ = this.stopSubject.asObservable();
  private imageUrls$!: Observable<BannerDetails[]>
  private currentIndex$ = this.selectedIndexSubject.pipe(
    filter(() => this.caraousalData.length > 0),
    switchMap(selectedIndex =>
      timer(0, 1800).pipe(
        takeUntil(this.stopSubject$.pipe(take(1))), // this line stops timer()
        map(tick => (tick + selectedIndex) % this.caraousalData.length)
      )
    )
  );

  constructor(private apicommService: ApicommService) { }

  ngOnInit(): void {
    this.bannersSubscription = this.apicommService.getBanners()
      .subscribe((data: BannerDetails[]) => {
        this.caraousalData = data;
        this.imageUrls$ = of(data);
        this.imageCollector$ = combineLatest([this.currentIndex$, this.imageUrls$]).pipe(
          map(([currentIndex, imageUrls]) => ({ currentIndex, imageUrls }))
        );
      });
  }

  onSlidePause() {
    this.stopSubject.next(true);
  }

  onSlidePlay(currentIndex: number) {
    this.selectedIndexSubject.next(currentIndex);
  }

  dotClick(index: number) {
    this.selectedIndexSubject.next(index);
  }

  previousImage(index: number) {
    this.selectedIndexSubject.next(index - 1);
  }

  nextImage(index: number) {
    this.selectedIndexSubject.next(index + 1);
  }

  onTouchStart(event: TouchEvent) {
    this.touchStartPoint = event.touches[0].clientX;
    event.preventDefault();
    event.stopPropagation();
    this.stopSubject.next(true);
  }

  onTouchMove(event: TouchEvent) {
    // console.log("move", event.touches[0].clientX);
  }

  onTouchStop(event: TouchEvent, currentIndex: number, totalDataLength: number) {
    if (this.touchStartPoint < event.changedTouches[0].clientX) {
      if (currentIndex === 0) {
        console.log(totalDataLength, currentIndex);
        currentIndex = totalDataLength;
      }
      this.selectedIndexSubject.next(currentIndex - 1);
    } else {
      this.selectedIndexSubject.next(currentIndex + 1);
    }
  }

  ngOnDestroy(): void{
    this.bannersSubscription.unsubscribe();
  }
}
