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
  isEdit: boolean = false;
  size: number = 5;
  listMonHoc: any;

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
    maMh: 0,
    ngaySinh: "",
    gioiTinh: "",
    diaChi: "",
    soDt: ""
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

  danhSachGiaoVienTruoc() {
    if (this.listGiaoVien.page > 1) {
      var previousPage = this.listGiaoVien.page - 1;
      if (!this.isSearch) {      
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
      if (!this.isSearch) {   
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

  kiemTraThemGiaoVien() {
    var check = false;
    if (this.giaoVien.maGv == 0 && this.giaoVien.tenGv != "" && this.giaoVien.maMh != 0 && this.giaoVien.ngaySinh != "" && this.giaoVien.diaChi != "" && this.giaoVien.soDt != "") {
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
        ngaySinh: this.giaoVien.ngaySinh,
        gioiTinh: $("#gioiTinh option:selected").text(),
        diaChi: this.giaoVien.diaChi,
        soDt: this.giaoVien.soDt
      };
      this.http.post("https://localhost:44329/api/GiaoVien/create", gv).subscribe(result => {
        res = result;
        if (res.success) {
          this.giaoVien = res.data;
          alert("Thêm thành công giáo viên mới !");
          this.danhSachGiaoVien(1);
          this.clearModal();
          $('#modalGiaoVien').modal('hide');
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
      ngaySinh: this.giaoVien.ngaySinh,
      gioiTinh: $("#gioiTinh option:selected").text(),
      diaChi: this.giaoVien.diaChi,
      soDt: this.giaoVien.soDt
    };    
    this.http.post("https://localhost:44329/api/GiaoVien/update", gv).subscribe(result => {
      res = result;
      if (res.success) {
        this.giaoVien = res.data;
        alert("Sửa thành công giáo viên !");
        this.danhSachGiaoVien(1);
        this.clearModal();
        $('#modalGiaoVien').modal('hide');
      }
      else {
        alert(res.message);
      }
    }, error => console.error(error)); 
  }

  xoaGiaoVien(index) {
    var r = confirm("Bạn có chắc là xóa giáo viên này không ?");
    if (r == true) {
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
          $('#modalGiaoVien').modal('hide');
        }
        else {
          alert(res.message);
        }
      }, error => console.error(error)); 
    }
  }

  openModal(isEdit, index) { 
    this.isEdit = isEdit;
    if (this.isEdit) {
      this.giaoVien = this.listGiaoVien.data[index];
      this.giaoVien.ngaySinh = this.listGiaoVien.data[index].ngaySinh.split("T")[0];
    } else {
      this.clearModal();
    }
    $('#modalGiaoVien').modal('show');   
  }

  clearModal() {
    this.giaoVien = {
      maGv: 0,
      tenGv: "",
      maMh: 0,
      ngaySinh: "",
      gioiTinh: "",
      diaChi: "",
      soDt: ""
    };
  }
}


