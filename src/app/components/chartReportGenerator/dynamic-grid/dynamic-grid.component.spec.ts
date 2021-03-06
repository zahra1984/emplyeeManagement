import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicGridComponent } from './dynamic-grid.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
describe('DynamicGridComponent', () => {
  let component: DynamicGridComponent;
  let fixture: ComponentFixture<DynamicGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
