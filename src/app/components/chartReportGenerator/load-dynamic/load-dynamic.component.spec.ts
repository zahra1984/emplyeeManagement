import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadDynamicComponent } from './load-dynamic.component';

describe('LoadDymanicComponent', () => {
  let component: LoadDynamicComponent;
  let fixture: ComponentFixture<LoadDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadDynamicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
