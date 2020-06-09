import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyTkbTheoGiaoVienComponent } from './quan-ly-tkb-theo-giao-vien.component';

describe('QuanLyTkbTheoGiaoVienComponent', () => {
  let component: QuanLyTkbTheoGiaoVienComponent;
  let fixture: ComponentFixture<QuanLyTkbTheoGiaoVienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanLyTkbTheoGiaoVienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLyTkbTheoGiaoVienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
