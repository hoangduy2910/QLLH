import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-chi-tiet-tkb-theo-lop',
  templateUrl: './chi-tiet-tkb-theo-lop.component.html',
  styleUrls: ['./chi-tiet-tkb-theo-lop.component.css']
})
export class ChiTietTkbTheoLopComponent {
  listNgayHoc: any = [];
  listTietHoc: any = [];
  listTKB: any;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.danhSachNgayHoc();
    this.danhSachTietHoc();
    this.danhSachThoiKhoaBieu();
  }

  loaded() {
    (<HTMLInputElement>document.getElementById("td1")).innerHTML = "123";
  }

  danhSachNgayHoc() {
    var res: any;
    this.http.post("https://localhost:44329/api/NgayHoc/get-all", null).subscribe(result => {
      res = result;
      if (res.success) {
        this.listNgayHoc = res.data;
      }
      else {
        alert(res.message);
      }
    }, error => console.error(error));
  }

  danhSachTietHoc() {
    var res: any;
    this.http.post("https://localhost:44329/api/TietHoc/get-all", null).subscribe(result => {
      res = result;
      if (res.success) {
        this.listTietHoc = res.data;
      }
      else {
        alert(res.message);
      }
    }, error => console.error(error));
  }

  danhSachThoiKhoaBieu() {
    var res: any;
    var x = {
      id: 2,
      keyword: ""
    };
    this.http.post("https://localhost:44329/api/ThoiKhoaBieu/get-by-class", x).subscribe(result => {
      res = result;
      if (res.success) {
        this.listTKB = res.data;
        this.hienThiThoiKhoaBieu();
      }
      else {
        alert(res.message);
      }
    }, error => console.error(error));
  }

  hienThiThoiKhoaBieu() {
    var res: any;
    var tkbTheoTiet: any;
    
    for (let i in this.listTietHoc) {
      var x = {
        maTiet: this.listTietHoc[i].maTiet,
        maLop: 2
      };
      this.http.post("https://localhost:44329/api/ThoiKhoaBieu/get-by-class-and-hour", x).subscribe(result => {
        res = result;
        if (res.success) {
          tkbTheoTiet = res.data;
          for (let i in tkbTheoTiet) {
            (<HTMLInputElement>document.getElementById("Tiet-" + tkbTheoTiet[i].maTiet + "-Ngay-" + tkbTheoTiet[i].maNgay)).textContent = tkbTheoTiet[i].tenMh;
          }
        }
        else {
          alert(res.message);
        }
      }, error => console.error(error));
    }
    
  }
}
