import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyLopHocComponent } from './quan-ly-lop-hoc.component';

describe('QuanLyLopHocComponent', () => {
  let component: QuanLyLopHocComponent;
  let fixture: ComponentFixture<QuanLyLopHocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanLyLopHocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLyLopHocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
