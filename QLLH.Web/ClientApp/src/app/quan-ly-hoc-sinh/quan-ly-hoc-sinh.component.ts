import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-quan-ly-hoc-sinh',
  templateUrl: './quan-ly-hoc-sinh.component.html',
  styleUrls: ['./quan-ly-hoc-sinh.component.css']
})
export class QuanLyHocSinhComponent {
  isSearch: boolean = false;
  isSearchByClass: boolean = false;
  isEdit: boolean = false;
  size: number = 10;
  tenLop: any;
  listLop: any;
  listGiaoVien: any;

  listHocSinh: any = {
    data: [],
    totalRecord: 0,
    totalPage: 0,
    page: 0,
    size: 0
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
    this.danhSachHocSinh(1);
    this.danhSachGiaoVien();
    this.danhSachLop();
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

  danhSachGiaoVien() {
    var res: any;
    this.http.post("https://localhost:44329/api/GiaoVien/get-all-no-detail", null).subscribe(result => {
      res = result;
      if (res.success) {
        this.listGiaoVien = res.data;
      }
      else {
        alert(res.message);
      }
    }, error => console.error(error));
  }

  danhSachHocSinh(cPage) {
    var res: any;
    let x = {
      page: cPage,
      size: this.size
    }
    this.http.post("https://localhost:44329/api/HocSinh/get-all", x).subscribe(result => {
      res = result;
      if (res.success) {
        this.listHocSinh = res.data;
        (<HTMLInputElement>document.getElementById("tenLop")).textContent = "Lớp";
      }
      else {
        alert(res.message);
      }
    }, error => console.error(error));
  }

  danhSachHocSinhTruoc() {
    if (this.listHocSinh.page > 1) {
      var previousPage = this.listHocSinh.page - 1;
      if (this.isSearchByClass) {
        this.timKiemHocSinhTheoLop(previousPage, this.tenLop);
      }
      else if (!this.isSearch) {      
        this.danhSachHocSinh(previousPage);
      } else {
        this.timKiemHocSinh(previousPage);
      }     
    } else {
      alert("Bạn đang ở trang đầu !");
    }
  }

  danhSachHocSinhSau() {
    if (this.listHocSinh.page < this.listHocSinh.totalPage) {
      var nextPage = this.listHocSinh.page + 1;
      if (this.isSearchByClass) {
        this.timKiemHocSinhTheoLop(nextPage, this.tenLop);
      }
      else if (!this.isSearch) {   
        this.danhSachHocSinh(nextPage);
      } else {
        this.timKiemHocSinh(nextPage);
      } 
    } else {
      alert("Bạn đang ở trang cuối !");
    }
  }

  timKiemHocSinh(cPage)
  {
    this.isSearch = true;
    var name = (<HTMLInputElement>document.getElementById("tenHocSinh")).value;
    var res: any;
    let x = {
      keyword: name,
      page: cPage,
      size: this.size
    }
    this.http.post("https://localhost:44329/api/HocSinh/get-by-name", x).subscribe(result => {
      res = result;
      if (res.success) {
        this.listHocSinh = res.data;
      }
      else {
        alert(res.message);
      }
    }, error => console.error(error));
  }

  timKiemHocSinhTheoLop(cPage, tenLop) 
  {
    this.tenLop = tenLop;
    this.isSearchByClass = true;
    (<HTMLInputElement>document.getElementById("tenLop")).textContent = tenLop;
    var res: any;
    let x = {
      keyword: tenLop,
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

  kiemTraThemHocSinh() {
    var check = false;
    if (this.hocSinh.maHs == 0 && this.hocSinh.tenHs != "" && this.hocSinh.maLop != 0 && this.hocSinh.maGv != 0 && this.hocSinh.ngaySinh != "" && this.hocSinh.gioiTinh != "" && this.hocSinh.diaChi != "") {
      check = true;
    }
    return check;
  }

  themHocSinh() {
    var check = this.kiemTraThemHocSinh();
    var hs: any;
    var res: any;

    if (check) {
      hs = {
        maHs: 0,
        tenHs: this.hocSinh.tenHs,
        maGv: this.hocSinh.maGv,
        maLop: this.hocSinh.maLop,
        ngaySinh: this.hocSinh.ngaySinh,
        gioiTinh: this.hocSinh.gioiTinh,
        diaChi: this.hocSinh.diaChi,
      };
      this.http.post("https://localhost:44329/api/HocSinh/create", hs).subscribe(result => {
        res = result;
        if (res.success) {
          this.hocSinh = res.data;
          alert("Thêm thành công học sinh mới !");
          this.danhSachHocSinh(1);
          this.clearModal();
          $('#modalHocSinh').modal('hide');
        }
        else {
          alert(res.message);
        }
      }, error => console.error(error)); 
    } else {
      alert("Bạn phải nhập đủ dữ liệu !"); 
    }
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
        this.danhSachHocSinh(1);
        this.clearModal();
        $('#modalHocSinh').modal('hide');
      }
      else {
        alert(res.message);
      }
    }, error => console.error(error)); 
  }

  xoaHocSinh(index) {
    var r = confirm("Bạn có chắc là xóa học sinh này không ?");
    if (r == true) {
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
          this.clearModal();
          this.danhSachHocSinh(1);
          $('#modalHocSinh').modal('hide');
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
      this.hocSinh = this.listHocSinh.data[index];
      this.hocSinh.ngaySinh = this.listHocSinh.data[index].ngaySinh.split("T")[0];
    } else {
      this.clearModal();
    }
    $('#modalHocSinh').modal('show');  
  }

  clearModal() {
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
