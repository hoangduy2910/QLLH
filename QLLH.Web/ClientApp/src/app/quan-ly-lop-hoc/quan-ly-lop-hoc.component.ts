import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-quan-ly-lop-hoc',
  templateUrl: './quan-ly-lop-hoc.component.html',
  styleUrls: ['./quan-ly-lop-hoc.component.css']
})

export class QuanLyLopHocComponent {
  size: number = 5;
  listGiaoVien: any;
  listHocSinh: any;
  maGvOld: number;
  maGvNew: number;
  GVCN: any;

  listLop: any = {
    data: [],
    totalRecord: 0,
    totalPage: 0,
    page: 0,
    size: 0
  };

  lop: any = {
    maLop: 0,
    tenLop: "",
    maGv: 0,
    tenGv: ""
  };

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { 
    this.danhSachLop(1);
    this.danhSachGiaoVien();
  }

  danhSachLop(cPage) {
    var res: any;
    let x = {
      page: cPage,
      size: this.size
    }
    this.http.post("https://localhost:44329/api/Lop/get-all", x).subscribe(result => {
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

  danhSachLopTruoc() {
    if (this.listLop.page > 1) {
      var previousPage = this.listLop.page - 1;
      this.danhSachLop(previousPage);
    } else {
      alert("Bạn đang ở trang đầu !");
    }
  }

  danhSachLopSau() {
    if (this.listLop.page < this.listLop.totalPage) {
      var nextPage = this.listLop.page + 1;
      this.danhSachLop(nextPage);
    } else {
      alert("Bạn đang ở trang cuối !");
    }
  }

  chiDinhGiaoVienChuNhiem() { 
    this.maGvNew = this.lop.maGv;

    var res: any;
    var x = {
      maGvOld: this.maGvOld,
      maGvNew: this.maGvNew
     };
    this.http.post("https://localhost:44329/api/HocSinh/update-list", x).subscribe(result => {
      res = result;
      if (res.success) {
        this.listHocSinh = res.data;
        console.log(this.listHocSinh);
      }
      else {
        alert(res.message);
      }
    }, error => console.error(error));

    var y = {
      maGvOld: this.maGvOld,
      maGvNew: this.maGvNew,
      maLop: this.lop.maLop
    };
    this.http.post("https://localhost:44329/api/GiaoVien/update-form-teacher", y).subscribe(result => {
      res = result;
      if (res.success) {
        this.GVCN = res.data;
        console.log(this.GVCN);
      }
      else {
        alert(res.message);
      }
    }, error => console.error(error));

    alert("Cập nhật thành công giáo viên chủ nhiệm !!!");
    location.reload();
    $('#modalEdit').modal('hide');  
  }

  openModalEdit(index) {
    this.lop = this.listLop.data[index];
    this.maGvOld = this.lop.maGv;
    $('#modalEdit').modal('show');
  }
}


