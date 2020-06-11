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
  maLop = parseInt(this.route.snapshot.paramMap.get('id'));
  listMonHoc: any;
  listLop: any;
  listGVTheoMH: any = [];

  listRowGiaoVien: any = [
    { row: 5 },
    { row: 10 },
    { row: 15 },
  ];

  listRowHocSinh: any = [
    { row: 10 },
    { row: 20 },
    { row: 30 },
  ];

  lop: any = {
    maLop: 0,
    tenLop: ""
  };

  giaoVienLop = {
    maGvl: 0,
    maGv: "",
    maLop: this.maLop
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

  chonSoDongHienThiGiaoVien(row) {
    this.size = row;
    this.danhSachGiaoVienTheoLop(1);
  }

  chonSoDongHienThiHocSinh(row) {
    this.size = row;
    this.danhSachHocSinhTheoLop(1);
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
    this.http.post("https://localhost:44329/api/GiaoVienLop/get-by-class", x).subscribe(result => {
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

  chonGiaoVienTheoMonHoc() {
    var maMh = (<HTMLInputElement>document.getElementById("monHoc")).value;
    var res: any;
    var x = {
      id: parseInt(maMh),
      keyword: ""
    };
    this.http.post("https://localhost:44329/api/GiaoVien/get-by-id-subject", x).subscribe(result => {
      res = result;
      if (res.success) {
        this.listGVTheoMH = res.data;
      }
      else {
        alert(res.message);
      }
    }, error => console.error(error)); 
  }

  themGiaoVien() {
    var res: any;
    var x = {
      maGvl: 0,
      maGv: this.giaoVienLop.maGv,
      maLop: this.giaoVienLop.maLop
    };
    this.http.post("https://localhost:44329/api/GiaoVienLop/create", x).subscribe(result => {
      res = result;
      if (res.success) {
        alert("Thêm thành công giáo viên vào lớp !");
        this.clearModalGiaoVien();
        this.danhSachGiaoVienTheoLop(1);
        $('#modalAddGiaoVien').modal('hide');
      }
      else {
        alert(res.message);
      }
    }, error => console.error(error)); 
  }

  xoaGiaoVien(index) {
    var gvl = {
      id: this.listGiaoVien.data[index].maGvl,
      keyword: ""
    };
    var res: any;
    this.http.post("https://localhost:44329/api/GiaoVienLop/remove", gvl).subscribe(result => {
      res = result;
      if (res.success) {
        alert("Xóa thành công giáo viên !");
        this.danhSachGiaoVienTheoLop(1);
        $('#modalDeleteGiaoVien').modal('hide');
      }
      else {
        alert(res.message);
      }
    }, error => console.error(error)); 
  }

  openModalAddGiaoVien() {
    $('#modalAddGiaoVien').modal('show');
  } 

  openModalDeleteGiaoVien(index) {
    $('#modalDeleteGiaoVien').modal('show');
    (<HTMLInputElement>document.getElementById("deleteBtnGiaoVien")).onclick = () => this.xoaGiaoVien(index)​;​
  }

  clearModalGiaoVien() {
    this.giaoVienLop = {
      maGvl: 0,
      maGv: "",
      maLop: this.maLop
    };
  }

  xoaHocSinh(index) {
    var res: any;
    var maHs = this.listHocSinh.data[index].maHs;

    var x = {
      id: maHs,
      keyword: ""
    };
    this.http.post("https://localhost:44329/api/HocSinh/get-by-id", x).subscribe(result => {
      res = result;
      if (res.success) {
        this.hocSinh = res.data;
        var hs = {
          maHs: this.hocSinh.maHs,
          tenHs: this.hocSinh.tenHs,
          maGv: this.hocSinh.maGv,
          maLop: this.hocSinh.maLop,
          ngaySinh: this.hocSinh.ngaySinh,
          gioiTinh: this.hocSinh.gioiTinh,
          diaChi: this.hocSinh.diaChi,
        };
        hs.maLop = 1;
        hs.maGv = 1;
        this.http.post("https://localhost:44329/api/HocSinh/update", hs).subscribe(result => {
          res = result;
          if (res.success) {
            this.hocSinh = res.data;
            alert("Xoá học sinh khỏi lớp thành công !!!");
            $('#modalDeleteHocSinh').modal('hide');
            this.danhSachHocSinhTheoLop(1);
          }
          else {
            alert(res.message);
        }
    }, error => console.error(error)); 
      }
      else {
        alert(res.message);
      }
    }, error => console.error(error)); 
  }

  openModalDeleteHocSinh(index) {
    $('#modalDeleteHocSinh').modal('show');
    (<HTMLInputElement>document.getElementById("deleteBtnHocSinh")).onclick = () => this.xoaHocSinh(index)​;​
  }
}
