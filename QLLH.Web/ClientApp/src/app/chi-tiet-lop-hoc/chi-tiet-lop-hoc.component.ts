import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-chi-tiet-lop-hoc',
  templateUrl: './chi-tiet-lop-hoc.component.html',
  styleUrls: ['./chi-tiet-lop-hoc.component.css']
})
export class ChiTietLopHocComponent {
  size: number = 5;
  listMonHoc: any;
  listLop: any;

  lop: any = {
    maLop: 0,
    tenLop: ""
  };
  
  listHocSinh: any = {
    data: [],
    totalRecord: 0,
    totalPage: 0,
    page: 0,
    size: 0
  };

  listGiaoVien: any = {
    data: [],
    totalRecord: 0,
    totalPage: 0,
    page: 0,
    size: 0
  };

  giaoVien = {
    maGv: 0,
    tenGv: "",
    maMh: null,
    maLop: 16,
    ngaySinh: "",
    gioiTinh: "",
    diaChi: "",
    soDt: "",
    maCv: 1
  };

  hocSinh = {
    maHs: 0,
    tenHs: "",
    maGv: 0,
    maLop: 0,
    ngaySinh: "",
    gioiTinh: "",
    diaChi: "",
  };
  
  constructor(private route: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { 
    this.layLopTheoId();
    this.danhSachMonHoc();
    this.danhSachLop();
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

  danhSachLop() {
    var res: any;
    this.http.post("https://localhost:44329/api/Lop/get-all-no-detail", null).subscribe(result => {
      res = result;
      if (res.success) {
        this.listLop = res.data;
      }
      else {
        alert(res.message);
      }
    }, error => console.error(error));
  }

  layLopTheoId() {
    var res: any;
    let x = {
      id: parseInt(this.route.snapshot.paramMap.get('id')),
      keyword: ""
    }
    this.http.post("https://localhost:44329/api/Lop/get-by-id", x).subscribe(result => {
      res = result;
      if (res.success) {
        this.lop = res.data;
        this.danhSachHocSinhTheoLop(1);
        this.danhSachGiaoVienTheoLop(1);
      }
      else {
        alert(res.message);
      }
    }, error => console.error(error));
  }

  danhSachGiaoVienTheoLop(cPage) {
    var res: any;
    let x = {
      keyword: this.lop.tenLop,
      page: cPage,
      size: this.size
    }
    this.http.post("https://localhost:44329/api/GiaoVien/get-by-class", x).subscribe(result => {
      res = result;
      if (res.success) {
        this.listGiaoVien = res.data;
      }
      else {
        alert(res.message);
      }
    }, error => console.error(error));
  }

  danhSachHocSinhTheoLop(cPage) {
    var res: any;
    let x = {
      keyword: this.lop.tenLop,
      page: cPage,
      size: this.size
    }
    this.http.post("https://localhost:44329/api/HocSinh/get-by-class", x).subscribe(result => {
      res = result;
      if (res.success) {
        this.listHocSinh = res.data;
      }
      else {
        alert(res.message);
      }
    }, error => console.error(error));
  }

  danhSachHocSinhTheoLopTruoc() {
    if (this.listHocSinh.page > 1) {
      var previousPage = this.listHocSinh.page - 1;
      this.danhSachHocSinhTheoLop(previousPage);
    } else {
      alert("Bạn đang ở trang đầu !");
    }
  }

  danhSachHocSinhTheoLopSau() {
    if (this.listHocSinh.page < this.listHocSinh.totalPage) {
      var nextPage = this.listHocSinh.page + 1;
      this.danhSachHocSinhTheoLop(nextPage);
    } else {
      alert("Bạn đang ở trang cuối !");
    }
  }

  danhSachGiaoVienTheoLopTruoc() {
    if (this.listGiaoVien.page > 1) {
      var previousPage = this.listGiaoVien.page - 1;
      this.danhSachGiaoVienTheoLop(previousPage);
    } else {
      alert("Bạn đang ở trang đầu !");
    }
  }

  danhSachGiaoVienTheoLopSau() {
    if (this.listGiaoVien.page < this.listGiaoVien.totalPage) {
      var nextPage = this.listGiaoVien.page + 1;
      this.danhSachGiaoVienTheoLop(nextPage);
    } else {
      alert("Bạn đang ở trang cuối !");
    }
  }

  suaGiaoVien() {
    var res: any;
    var gv = {
      maGv: this.giaoVien.maGv,
      tenGv: this.giaoVien.tenGv,
      maMh: this.giaoVien.maMh,
      maLop: this.giaoVien.maLop,
      ngaySinh: this.giaoVien.ngaySinh,
      gioiTinh: $("#gioiTinh option:selected").text(),
      diaChi: this.giaoVien.diaChi,
      soDt: this.giaoVien.soDt,
      maCv: this.giaoVien.maCv
    };    
    this.http.post("https://localhost:44329/api/GiaoVien/update", gv).subscribe(result => {
      res = result;
      if (res.success) {
        this.giaoVien = res.data;
        alert("Sửa thành công giáo viên !");
        this.danhSachGiaoVienTheoLop(1);
        this.clearModalGiaoVien();
        $('#modalAddEditGiaoVien').modal('hide');
      }
      else {
        alert(res.message);
      }
    }, error => console.error(error)); 
  }

  xoaGiaoVien(index) {
    var gv = {
      id: this.listGiaoVien.data[index].maGv,
      keyword: ""
    };
    var res: any;
    this.http.post("https://localhost:44329/api/GiaoVien/remove", gv).subscribe(result => {
      res = result;
      if (res.success) {
        this.giaoVien = res.data;
        alert("Xóa thành công giáo viên !");
        this.clearModalGiaoVien();
        this.danhSachGiaoVienTheoLop(1);
        $('#modalDeleteGiaoVien').modal('hide');
      }
      else {
        alert(res.message);
      }
    }, error => console.error(error)); 
  }

  openModalAddEditGiaoVien(index) { 
    this.giaoVien = this.listGiaoVien.data[index];
    this.giaoVien.ngaySinh = this.listGiaoVien.data[index].ngaySinh.split("T")[0];
    $('#modalAddEditGiaoVien').modal('show');  
  }

  openModalDeleteGiaoVien(index) {
    $('#modalDeleteGiaoVien').modal('show');
    (<HTMLInputElement>document.getElementById("deleteBtnGiaoVien")).onclick = () => this.xoaGiaoVien(index)​;​
  }

  clearModalGiaoVien() {
    this.giaoVien = {
      maGv: 0,
      tenGv: "",
      maMh: null,
      maLop: 16,
      ngaySinh: "",
      gioiTinh: "",
      diaChi: "",
      soDt: "",
      maCv: 1
    };
  }

  suaHocSinh() {
    var res: any;
    var hs = {
      maHs: this.hocSinh.maHs,
      tenHs: this.hocSinh.tenHs,
      maGv: this.hocSinh.maGv,
      maLop: this.hocSinh.maLop,
      ngaySinh: this.hocSinh.ngaySinh,
      gioiTinh: this.hocSinh.gioiTinh,
      diaChi: this.hocSinh.diaChi,
    };   
    this.http.post("https://localhost:44329/api/HocSinh/update", hs).subscribe(result => {
      res = result;
      if (res.success) {
        this.hocSinh = res.data;
        alert("Sửa thành công học sinh !");
        this.danhSachHocSinhTheoLop(1);
        this.clearModalHocSinh();
        $('#modalAddEditHocSinh').modal('hide');
      }
      else {
        alert(res.message);
      }
    }, error => console.error(error)); 
  }

  xoaHocSinh(index) {
    var hs = {
      id: this.listHocSinh.data[index].maHs,
      keyword: ""
    };
    var res: any;
    this.http.post("https://localhost:44329/api/HocSinh/remove", hs).subscribe(result => {
      res = result;
      if (res.success) {
        this.hocSinh = res.data;
        alert("Xóa thành công học sinh !");
        this.clearModalHocSinh();
        this.danhSachHocSinhTheoLop(1);
        $('#modalDeleteHocSinh').modal('hide');
      }
      else {
        alert(res.message);
      }
    }, error => console.error(error)); 
  }

  openModalAddEditHocSinh(index) {
    this.hocSinh = this.listHocSinh.data[index];
    this.hocSinh.ngaySinh = this.listHocSinh.data[index].ngaySinh.split("T")[0];
    $('#modalAddEditHocSinh').modal('show');  
  }

  openModalDeleteHocSinh(index) {
    $('#modalDeleteHocSinh').modal('show');
    (<HTMLInputElement>document.getElementById("deleteBtnHocSinh")).onclick = () => this.xoaHocSinh(index)​;​
  }

  clearModalHocSinh() {
    this.hocSinh = {
      maHs: 0,
      tenHs: "",
      maGv: 0,
      maLop: 0,
      ngaySinh: "",
      gioiTinh: "",
      diaChi: "",
    };
  }
}
