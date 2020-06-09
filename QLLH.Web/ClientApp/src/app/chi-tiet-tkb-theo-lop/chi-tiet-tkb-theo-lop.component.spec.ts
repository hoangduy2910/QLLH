import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietTkbTheoLopComponent } from './chi-tiet-tkb-theo-lop.component';

describe('ChiTietTkbTheoLopComponent', () => {
  let component: ChiTietTkbTheoLopComponent;
  let fixture: ComponentFixture<ChiTietTkbTheoLopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiTietTkbTheoLopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiTietTkbTheoLopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
