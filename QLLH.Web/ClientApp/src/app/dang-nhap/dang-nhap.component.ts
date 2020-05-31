import { Component } from '@angular/core';

@Component({
  selector: 'app-dang-nhap',
  templateUrl: './dang-nhap.component.html',
  styleUrls: ['./dang-nhap.component.css']
})
export class DangNhapComponent {
  constructor() { }

  dangNhap() {
    location.replace("http://localhost:4200/trang-chu");
  }
}
