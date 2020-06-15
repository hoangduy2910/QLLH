import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-quan-ly-giao-vien',
  templateUrl: './quan-ly-giao-vien.component.html',
  styleUrls: ['./quan-ly-giao-vien.component.css']
})

export class QuanLyGiaoVienComponent {
  isSearch: boolean = false;
  isSearchBySubject: boolean = false;
  isEdit: boolean = false;
  size: number = 10;
  listMonHoc: any;
  listLop: any;
  tenMH: any;

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
    maLop: 1,
    ngaySinh: "",
    gioiTinh: "",
    diaChi: "",
    soDt: "",
    maCv: 2
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

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.danhSachGiaoVien(1);
    this.danhSachMonHoc();
    this.danhSachLop();
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

  kiemTraThemGiaoVien() {
    var check = false;
    if (this.giaoVien.maGv == 0 && this.giaoVien.tenGv != "" && this.giaoVien.maMh != 0 && this.giaoVien.maLop != 0 && this.giaoVien.ngaySinh != "" && this.giaoVien.gioiTinh != "" && this.giaoVien.diaChi != "" && this.giaoVien.soDt != "") {
      check = true;
    }
    return check;
  }

  themGiaoVien() {
    var check = this.kiemTraThemGiaoVien();
    var gv: any;
    var res: any;

    if (check) {
      gv = {
        maGv: 0,
        tenGv: this.giaoVien.tenGv,
        maMh: this.giaoVien.maMh,
        maLop: this.giaoVien.maLop,
        ngaySinh: this.giaoVien.ngaySinh,
        gioiTinh: $("#gioiTinh option:selected").text(),
        diaChi: this.giaoVien.diaChi,
        soDt: this.giaoVien.soDt,
        maCv: this.giaoVien.maCv
      };
      this.http.post("https://localhost:44329/api/GiaoVien/create", gv).subscribe(result => {
        res = result;
        if (res.success) {
          this.giaoVien = res.data;
          alert("Thêm thành công giáo viên mới !");
          this.danhSachGiaoVien(1);
          this.clearModal();
          $('#modalAddEdit').modal('hide');
        }
        else {
          alert(res.message);
        }
      }, error => console.error(error)); 
    } else {
      alert("Bạn phải nhập đủ dữ liệu !"); 
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
        (<HTMLInputElement>document.getElementById("tenMonHoc")).textContent = "Môn học";
        this.danhSachGiaoVien(1);
        this.clearModal();
        $('#modalAddEdit').modal('hide');
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
        this.clearModal();
        this.danhSachGiaoVien(1);
        $('#modalDelete').modal('hide');
      }
      else {
        alert(res.message);
      }
    }, error => console.error(error)); 
  }

  openModalAddEdit(isEdit, index) { 
    this.isEdit = isEdit;
    if (this.isEdit) {
      this.giaoVien = this.listGiaoVien.data[index];
      this.giaoVien.ngaySinh = this.listGiaoVien.data[index].ngaySinh.split("T")[0];
    } else {
      this.clearModal();
    }
    $('#modalAddEdit').modal('show');   
  }

  openModalDelete(index) {
    $('#modalDelete').modal('show');
    (<HTMLInputElement>document.getElementById("deleteBtn")).onclick = () => this.xoaGiaoVien(index)​;​
  }

  clearModal() {
    this.giaoVien = {
      maGv: 0,
      tenGv: "",
      maMh: null,
      maLop: 1,
      ngaySinh: "",
      gioiTinh: "",
      diaChi: "",
      soDt: "",
      maCv: 2
    };
  }
}


