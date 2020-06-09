import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyTkbTheoLopComponent } from './quan-ly-tkb-theo-lop.component';

describe('QuanLyTkbTheoLopComponent', () => {
  let component: QuanLyTkbTheoLopComponent;
  let fixture: ComponentFixture<QuanLyTkbTheoLopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanLyTkbTheoLopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLyTkbTheoLopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
