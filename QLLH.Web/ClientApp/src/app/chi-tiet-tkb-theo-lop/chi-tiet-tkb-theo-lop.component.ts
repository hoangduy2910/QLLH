import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-chi-tiet-tkb-theo-lop',
  templateUrl: './chi-tiet-tkb-theo-lop.component.html',
  styleUrls: ['./chi-tiet-tkb-theo-lop.component.css']
})
export class ChiTietTkbTheoLopComponent {
  lopHoc: any = [];
  listNgayHoc: any = [];
  listTietHoc: any = [];
  listTKB: any = [];
  listMonHoc: any = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {   
    this.layLopTheoID();
    this.danhSachNgayHoc();
    this.danhSachTietHoc();
    this.danhSachMonHoc();
    this.danhSachThoiKhoaBieu();  
  }

  layLopTheoID() {
    var res: any;
    var x = {
      id: parseInt(this.route.snapshot.paramMap.get('id')),
      keyword: ""
    };
    this.http.post("https://localhost:44329/api/Lop/get-by-id", x).subscribe(result => {
      res = result;
      if (res.success) {
        this.lopHoc = res.data;
      }
      else {
        alert(res.message);
      }
    }, error => console.error(error));
  }

  danhSachMonHoc() {
    var res: any;
    this.http.post("https://localhost:44329/api/MonHoc/get-all", null).subscribe(result => {
      res = result;
      if (res.success) {
        this.listMonHoc = res.data;
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

  danhSachThoiKhoaBieu() {
    var res: any;
    var x = {
      id: parseInt(this.route.snapshot.paramMap.get('id')),
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
    var id: any;
    
    for (let i in this.listTietHoc) {
      var x = {
        maTiet: this.listTietHoc[i].maTiet,
        maLop: parseInt(this.route.snapshot.paramMap.get('id'))
      };
      this.http.post("https://localhost:44329/api/ThoiKhoaBieu/get-by-class-and-hour", x).subscribe(result => {
        res = result;
        if (res.success) {
          tkbTheoTiet = res.data;
          for (let i in tkbTheoTiet) {
            id = tkbTheoTiet[i].maMh + "-" + tkbTheoTiet[i].maTiet + "-" + tkbTheoTiet[i].maNgay;
            $("#" + id).attr("selected", "selected");
            $("#" + id).attr("value", tkbTheoTiet[i].maTkb);
          }
        }
        else {
          alert(res.message);
        }
      }, error => console.error(error));
    }
  }
}
