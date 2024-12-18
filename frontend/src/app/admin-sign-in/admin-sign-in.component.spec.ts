import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSignInComponent } from './admin-sign-in.component';

describe('AdminSignInComponent', () => {
  let component: AdminSignInComponent;
  let fixture: ComponentFixture<AdminSignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminSignInComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
