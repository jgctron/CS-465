import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateTripListingComponent } from './private-trip-listing.component';

describe('PrivateTripListingComponent', () => {
  let component: PrivateTripListingComponent;
  let fixture: ComponentFixture<PrivateTripListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivateTripListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivateTripListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
