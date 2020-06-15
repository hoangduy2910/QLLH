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
  maLop = parseInt(this.route.snapshot.paramMap.get('id'));
  checkGVBM: boolean = false;
  maMh: any; maTiet: any; maNgay: any;

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
    soDt: "",
    maCv: 2
  };

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
  }

  layLopTheoID() {
    var res: any;
    var x = {
      id: this.maLop,
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
        this.danhSachThoiKhoaBieu();
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
      id: this.maLop,
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
        maLop: this.maLop
      };
      this.http.post("https://localhost:44329/api/ThoiKhoaBieu/get-by-class-and-hour", x).subscribe(result => {
        res = result;
        if (res.success) {
          tkbTheoTiet = res.data;
          for (let i in tkbTheoTiet) {
            id = tkbTheoTiet[i].maMh + "-" + tkbTheoTiet[i].maTiet + "-" + tkbTheoTiet[i].maNgay;
            $("#" + id).attr("selected", "selected");
          }
        }
        else {
          alert(res.message);
        }
      }, error => console.error(error));
    }  
    this.kiemTraGiaoVienBoMon();
  }

  kiemTraGiaoVienBoMon() {
    var res: any;
    var gvBM: any = [];
    var x = {
      id: this.maLop,
      keyword: ""
    };
    this.http.post("https://localhost:44329/api/GiaoVienLop/get-by-class", x).subscribe(result => {
      res = result;
      if (res.success) {
        gvBM = res.data;
        if (gvBM.length >= 13) {
          this.checkGVBM = true;
        }
        if (!this.checkGVBM)
          $('#modalCapNhatGVBM').modal({backdrop: 'static', keyboard: false});
      }
      else {
        alert(res.message);
      }
    }, error => console.error(error));
  }

  capNhatGVBM() {
    location.replace("http://localhost:4200/chi-tiet-lop-hoc/" + this.maLop);
  }

  capNhatDanhSachThoiKhoaBieu() {
    var res: any;
    var that = this;
    var tietHoc: any;
    var x: any, y: any;
    var tkbNew: any;

    for(let i = 1; i <= this.listTietHoc.length; i++) {
      var listTietHoc = "#listTietHoc-" + i + " > td > select > option:selected";
      $(listTietHoc).each(function() {
        tietHoc = $(this).attr("id").split("-");
        that.maMh = parseInt(tietHoc[0]);
        that.maTiet = parseInt(tietHoc[1]);
        that.maNgay = parseInt(tietHoc[2]);

        x = {
          maTiet: that.maTiet,
          maNgay: that.maNgay,
          maLop: that.maLop
        };
        that.http.post("https://localhost:44329/api/ThoiKhoaBieu/get-by-hour-date-class", x).subscribe(result => {
          res = result;
          if (res.success) {
            that.tkbOld = res.data;   
          }
        });
        
        y = {
          maLop: that.maLop,
          maMh: that.maMh
        };
        that.http.post("https://localhost:44329/api/GiaoVienLop/get-by-subject-and-class", y).subscribe(result => {
            res = result;
            if (res.success) {
              that.giaoVien = res.data;
              
              tkbNew = {
                maTkb: that.tkbOld.maTkb,
                maNgay: that.tkbOld.maNgay,
                maTiet: that.tkbOld.maTiet,
                maMh: that.giaoVien.maMh,
                maGv: that.giaoVien.maGv,
                maLop: that.maLop
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
    }
    alert("Cập nhật thời khóa biểu thành công !");
  }

  lamMoiThoiKhoaBieu() {
    for(let i = 1; i <= this.listTietHoc.length; i++) {
      var listTietHoc = "#listTietHoc-" + i + " > td > select";
      $(listTietHoc).each(function() {
        $(this[0]).attr("selected", "selected");
      })
    }
  }
}
