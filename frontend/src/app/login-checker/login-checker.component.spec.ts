import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCheckerComponent } from './login-checker.component';

describe('LoginCheckerComponent', () => {
  let component: LoginCheckerComponent;
  let fixture: ComponentFixture<LoginCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginCheckerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
