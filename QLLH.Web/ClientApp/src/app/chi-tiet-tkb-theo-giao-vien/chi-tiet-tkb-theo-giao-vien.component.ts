import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-chi-tiet-tkb-theo-giao-vien',
  templateUrl: './chi-tiet-tkb-theo-giao-vien.component.html',
  styleUrls: ['./chi-tiet-tkb-theo-giao-vien.component.css']
})
export class ChiTietTkbTheoGiaoVienComponent {
  listNgayHoc: any = [];
  listTietHoc: any = [];
  listMonHoc: any = [];
  listLopHoc: any = [];
  listTKB: any = [];
  giaoVien: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {   
    this.layGiaoVienTheoID();
    this.danhSachNgayHoc();
    this.danhSachTietHoc();
    this.danhSachLopHoc();
    this.danhSachThoiKhoaBieu();
  }

  layGiaoVienTheoID() {
    var res: any;
    var x = {
      id: parseInt(this.route.snapshot.paramMap.get('id')),
      keyword: ""
    };
    this.http.post("https://localhost:44329/api/GiaoVien/get-by-id", x).subscribe(result => {
      res = result;
      if (res.success) {
        this.giaoVien = res.data;
      }
      else {
        alert(res.message);
      }
    }, error => console.error(error));
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

  danhSachLopHoc() {
    var res: any;
    this.http.post("https://localhost:44329/api/Lop/get-all-no-detail", null).subscribe(result => {
      res = result;
      if (res.success) {
        this.listLopHoc = res.data;
      }
      else {
        alert(res.message);
      }
    }, error => console.error(error));
  }

  danhSachThoiKhoaBieu() {
    var res: any;
    var x = {
      id: parseInt(this.route.snapshot.paramMap.get('id')),
      keyword: ""
    };
    this.http.post("https://localhost:44329/api/ThoiKhoaBieu/get-by-teacher", x).subscribe(result => {
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
    var id: any;
    for (let i in this.listTKB) {
      id = this.listTKB[i].maLop + "-" + this.listTKB[i].maTiet + "-" + this.listTKB[i].maNgay;
      $("#" + id).attr("selected", "selected");
    }
  }
}
