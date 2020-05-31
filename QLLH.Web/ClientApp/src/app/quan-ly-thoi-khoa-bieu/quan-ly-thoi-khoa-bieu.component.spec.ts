import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyThoiKhoaBieuComponent } from './quan-ly-thoi-khoa-bieu.component';

describe('QuanLyThoiKhoaBieuComponent', () => {
  let component: QuanLyThoiKhoaBieuComponent;
  let fixture: ComponentFixture<QuanLyThoiKhoaBieuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanLyThoiKhoaBieuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLyThoiKhoaBieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
