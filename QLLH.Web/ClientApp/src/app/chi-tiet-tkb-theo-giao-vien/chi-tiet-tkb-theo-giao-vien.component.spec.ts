import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietTkbTheoGiaoVienComponent } from './chi-tiet-tkb-theo-giao-vien.component';

describe('ChiTietTkbTheoGiaoVienComponent', () => {
  let component: ChiTietTkbTheoGiaoVienComponent;
  let fixture: ComponentFixture<ChiTietTkbTheoGiaoVienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiTietTkbTheoGiaoVienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiTietTkbTheoGiaoVienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
