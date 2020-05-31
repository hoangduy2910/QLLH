import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyGiaoVienComponent } from './quan-ly-giao-vien.component';

describe('QuanLyGiaoVienComponent', () => {
  let component: QuanLyGiaoVienComponent;
  let fixture: ComponentFixture<QuanLyGiaoVienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanLyGiaoVienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLyGiaoVienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
