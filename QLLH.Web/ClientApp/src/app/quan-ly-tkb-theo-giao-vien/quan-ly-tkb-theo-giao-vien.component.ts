import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-quan-ly-tkb-theo-giao-vien',
  templateUrl: './quan-ly-tkb-theo-giao-vien.component.html',
  styleUrls: ['./quan-ly-tkb-theo-giao-vien.component.css']
})
export class QuanLyTkbTheoGiaoVienComponent {
  size: number = 10;
  listMonHoc: any;
  isSearch: boolean = false;
  isSearchBySubject: boolean = false;
  tenMH: any;
  
  listGiaoVien: any = {
    data: [],
    totalRecord: 0,
    totalPage: 0,
    page: 0,
    size: 0
  };

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.danhSachGiaoVien(1);
    this.danhSachMonHoc();
  }

  danhSachGiaoVien(cPage) {
    var res: any;
    let x = {
      page: cPage,
      size: this.size
    }
    this.http.post("https://localhost:44329/api/GiaoVien/get-all", x).subscribe(result => {
      res = result;
      if (res.success) {
        this.listGiaoVien = res.data;
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

  danhSachGiaoVienTruoc() {
    if (this.listGiaoVien.page > 1) {
      var previousPage = this.listGiaoVien.page - 1;
      if (this.isSearchBySubject) {
        this.timKiemGiaoVienTheoMonHoc(previousPage, this.tenMH);
      }
      else if (!this.isSearch) {      
        this.danhSachGiaoVien(previousPage);
      } else {
        this.timKiemGiaoVien(previousPage);
      }     
    } else {
      alert("Bạn đang ở trang đầu !");
    }
  }

  danhSachGiaoVienSau() {
    if (this.listGiaoVien.page < this.listGiaoVien.totalPage) {
      var nextPage = this.listGiaoVien.page + 1;
      if (this.isSearchBySubject) {
        this.timKiemGiaoVienTheoMonHoc(nextPage, this.tenMH);
      }
      else if (!this.isSearch) {   
        this.danhSachGiaoVien(nextPage);
      } else {
        this.timKiemGiaoVien(nextPage);
      } 
    } else {
      alert("Bạn đang ở trang cuối !");
    }
  }

  timKiemGiaoVien(cPage)
  {
    this.isSearch = true;
    var name = (<HTMLInputElement>document.getElementById("tenGiaoVien")).value;
    var res: any;
    let x = {
      keyword: name,
      page: cPage,
      size: this.size
    }
    this.http.post("https://localhost:44329/api/GiaoVien/get-by-name", x).subscribe(result => {
      res = result;
      if (res.success) {
        this.listGiaoVien = res.data;
      }
      else {
        alert(res.message);
      }
    }, error => console.error(error));
  }

  timKiemGiaoVienTheoMonHoc(cPage, tenMH) {
    this.tenMH = tenMH;
    this.isSearchBySubject = true;
    (<HTMLInputElement>document.getElementById("tenMonHoc")).textContent = tenMH;
    var res: any;
    let x = {
      keyword: tenMH,
      page: cPage,
      size: this.size
    }
    this.http.post("https://localhost:44329/api/GiaoVien/get-by-subject", x).subscribe(result => {
      res = result;
      if (res.success) {
        this.listGiaoVien = res.data;
      }
      else {
        alert(res.message);
      }
    }, error => console.error(error));
  }
}
