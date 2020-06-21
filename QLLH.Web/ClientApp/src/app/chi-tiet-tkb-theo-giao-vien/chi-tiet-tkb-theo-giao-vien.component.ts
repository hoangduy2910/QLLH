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
  listLopHocTheoGV: any = [];
  danhSachMaLopTheoGV: any = [];
  listTKB: any = [];
  maLop: any; maTiet: any; maNgay: any;

  tkbOld = {
    maTkb: 0,
    maNgay: 0,
    maTiet: 0,
    maMh: 0,
    maGv: 0,
    maLop: 0
  };

  giaoVien = {
    maGv: 0,
    tenGv: "",
    maMh: null,
    maLop: 1,
    ngaySinh: "",
    gioiTinh: "",
    diaChi: "",
    soDt: ""
  };

  constructor(private route: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {   
    this.layGiaoVienTheoID();
    this.danhSachNgayHoc();
    this.danhSachTietHoc();
    this.danhSachLopHoc();
    this.danhSachLopHocTheoGiaoVien();
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
        this.danhSachThoiKhoaBieu();
      }
      else {
        alert(res.message);
      }
    }, error => console.error(error));
  }

  danhSachLopHocTheoGiaoVien() {
    var res: any;
    var x = {
      id: parseInt(this.route.snapshot.paramMap.get('id')),
      keyword: ""
    };
    this.http.post("https://localhost:44329/api/GiaoVienLop/get-by-teacher", x).subscribe(result => {
      res = result;
      if (res.success) {
        this.listLopHocTheoGV = res.data;
        for (let i in this.listLopHocTheoGV) {
          this.danhSachMaLopTheoGV[i] = this.listLopHocTheoGV[i].maLop;
        }
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

  capNhatDanhSachThoiKhoaBieu() {
    var res: any;
    var x: any, y: any;
    var that = this;
    var tietHoc: any;
    var tkbNew: any;

    var listTietHoc = "#listTietHoc-" + 1 + " > td > select > option:selected";
    $(listTietHoc).each(function() {
      tietHoc = $(this).attr("id").split("-");
      that.maLop = parseInt(tietHoc[0]);
      that.maTiet = parseInt(tietHoc[1]);
      that.maNgay = parseInt(tietHoc[2]);

      x = {
        maTiet: that.maTiet,
        maNgay: that.maNgay,
        maLop: that.maLop
      };
      var maLop = that.maLop;
      that.http.post("https://localhost:44329/api/ThoiKhoaBieu/get-by-hour-date-class", x).subscribe(result => {
        res = result;
        if (res.success) {
          that.tkbOld = res.data;  

          console.log(that.tkbOld);

          tkbNew = {
            maTkb: that.tkbOld.maTkb,
            maNgay: that.tkbOld.maNgay,
            maTiet: that.tkbOld.maTiet,
            maMh: that.giaoVien.maMh,
            maGv: that.giaoVien.maGv,
            maLop: maLop
          };
          that.http.post("https://localhost:44329/api/ThoiKhoaBieu/update", tkbNew).subscribe(result => {
            res = result;
            if (res.success) {
              tkbNew = res.data;
              that.hienThiThoiKhoaBieu();
            }
          }, error => console.error(error));
        }
      });
    });
    $('#modalCapNhatTKB').modal("hide");
    alert("Cập nhật thời khóa biểu thành công !");
  }

  openModalCapNhatTKB() {
    $('#modalCapNhatTKB').modal("show");
  }
}
