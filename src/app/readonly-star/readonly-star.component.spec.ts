import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadonlyStarComponent } from './readonly-star.component';

describe('ReadonlyStarComponent', () => {
  let component: ReadonlyStarComponent;
  let fixture: ComponentFixture<ReadonlyStarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadonlyStarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadonlyStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
