import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceReuseableComponent } from './resource-reuseable.component';

describe('ResourceReuseableComponent', () => {
  let component: ResourceReuseableComponent;
  let fixture: ComponentFixture<ResourceReuseableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResourceReuseableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceReuseableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
