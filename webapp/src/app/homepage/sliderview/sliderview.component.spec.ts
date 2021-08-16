import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderviewComponent } from './sliderview.component';

describe('SliderviewComponent', () => {
  let component: SliderviewComponent;
  let fixture: ComponentFixture<SliderviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
