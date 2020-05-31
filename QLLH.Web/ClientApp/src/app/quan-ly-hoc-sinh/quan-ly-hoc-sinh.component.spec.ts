import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyHocSinhComponent } from './quan-ly-hoc-sinh.component';

describe('QuanLyHocSinhComponent', () => {
  let component: QuanLyHocSinhComponent;
  let fixture: ComponentFixture<QuanLyHocSinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanLyHocSinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLyHocSinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
