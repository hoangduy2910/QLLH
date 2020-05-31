import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietThoiKhoaBieuComponent } from './chi-tiet-thoi-khoa-bieu.component';

describe('ChiTietThoiKhoaBieuComponent', () => {
  let component: ChiTietThoiKhoaBieuComponent;
  let fixture: ComponentFixture<ChiTietThoiKhoaBieuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiTietThoiKhoaBieuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiTietThoiKhoaBieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
