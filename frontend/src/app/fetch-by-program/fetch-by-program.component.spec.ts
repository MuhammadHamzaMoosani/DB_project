import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchByProgramComponent } from './fetch-by-program.component';

describe('FetchByProgramComponent', () => {
  let component: FetchByProgramComponent;
  let fixture: ComponentFixture<FetchByProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FetchByProgramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FetchByProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
