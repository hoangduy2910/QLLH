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
  size: number = 10;
  maLop = parseInt(this.route.snapshot.paramMap.get('id'));

  listLop: any = [];
  listMonHoc: any = [];
  listGiaoVien: any = [];
  listGiaoVienTheoLop: any = [];

  lop: any = {
    maLop: 0,
    tenLop: ""
  };

  tkbOld = {
    maTkb: 0,
    maNgay: 0,
    maTiet: 0,
    maMh: 0,
    maGv: 0,
    maLop: 0
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
  
  listHocSinh: any = {
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
    this.danhSachGiaoVien();
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

  danhSachGiaoVien() {
    var res: any;
    this.http.post("https://localhost:44329/api/GiaoVien/get-all-no-detail", null).subscribe(result => {
      res = result;
      if (res.success) {
        this.listGiaoVien = res.data;
        this.danhSachGiaoVienTheoLop();
      }
      else {
        alert(res.message);
      }
    }, error => console.error(error));
  }

  danhSachGiaoVienTheoLop() {
    var res: any;
    var x = {
      id: this.maLop,
      keyword: ""
    };
    this.http.post("https://localhost:44329/api/GiaoVienLop/get-by-class", x).subscribe(result => {
      res = result;
      if (res.success) {
        this.listGiaoVienTheoLop = res.data;

        for (let i in this.listGiaoVienTheoLop) {
          var gv = this.listGiaoVienTheoLop[i];
          $("#giaoVienBoMon" + gv.maMh + " > option").each(function() {
            if (this.value == gv.maGv) {
              $("#giaoVienBoMon" + gv.maMh + " > option[value=" + gv.maGv + "]").attr('selected','selected');
            }
          });
        }
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

  openModalUpdateGiaoVien(maMh) {
    $('#modalUpdateGiaoVien').modal('show');
    (<HTMLInputElement>document.getElementById("capNhatBtnGiaoVien")).onclick = () => this.capNhatGiaoVienBoMon(maMh)​;​
  }

  capNhatGiaoVienBoMon(maMh) {
    var maGvNew = $("#giaoVienBoMon" + maMh + " option:selected" ).val();
    var res: any;
    var gvlNew: any;
    var gvlOld = {
      maGvl: 0,
      maGv: 0,
      maLop: 0,
      maMh: 0
    };
    var x = {
      maLop: this.maLop,
      maMh: maMh
    };
    this.http.post("https://localhost:44329/api/GiaoVienLop/get-by-subject-and-class", x).subscribe(result => {
      res = result;
      if (res.success) {
        if (res.data) {
          gvlOld = res.data;
          
          var z = {
            maGvl: 0,
            maGv: gvlOld.maGv,
            maLop: this.maLop
          };
          this.http.post("https://localhost:44329/api/ThoiKhoaBieu/get-by-teacher-and-class", z).subscribe(result => {
            res = result;
            if (res.success) {
              this.tkbOld = res.data;
              
              for (var i in this.tkbOld) {
                var tkbNew = {
                  maTkb: this.tkbOld[i].maTkb,
                  maNgay: this.tkbOld[i].maNgay,
                  maTiet: this.tkbOld[i].maTiet,
                  maMh: 1,
                  maGv: 1,
                  maLop: this.tkbOld[i].maLop
                };

                this.http.post("https://localhost:44329/api/ThoiKhoaBieu/update", tkbNew).subscribe(result => {
                  res = result;
                  if (res.success) {
                    this.tkbOld = res.data;
                  }
                }, error => console.error(error));
              }
            }
          });

          if (maGvNew == 1)
          {
            var y = {
              maGvl: gvlOld.maGvl,
              maGv: 1,
              maLop: this.maLop
            };
            this.http.post("https://localhost:44329/api/GiaoVienLop/update", y).subscribe(result => {
              res = result;
              if (res.success) {
                gvlNew = res.data;
                alert("Cập nhật giáo viên bộ môn thành công !!!");
                $('#modalUpdateGiaoVien').modal('hide');
                this.danhSachGiaoVienTheoLop();
              }
              else {
                alert(res.message);
              }
            }, error => console.error(error));
          }
          else {
            var y = {
              maGvl: gvlOld.maGvl,
              maGv: parseInt(maGvNew),
              maLop: this.maLop
            };
            this.http.post("https://localhost:44329/api/GiaoVienLop/update", y).subscribe(result => {
              res = result;
              if (res.success) {
                gvlNew = res.data;
                alert("Cập nhật giáo viên bộ môn thành công !!!");
                $('#modalUpdateGiaoVien').modal('hide');
                this.danhSachGiaoVienTheoLop();
              }
              else {
                alert(res.message);
              }
            }, error => console.error(error));
          }
        }
        else {
          var z = {
            maGvl: 0,
            maGv: parseInt(maGvNew),
            maLop: this.maLop
          };
          this.http.post("https://localhost:44329/api/GiaoVienLop/create", z).subscribe(result => {
            res = result;
            if (res.success) {
              gvlNew = res.data;
              alert("Cập nhật giáo viên bộ môn thành công !!!");
              $('#modalUpdateGiaoVien').modal('hide');
              this.danhSachGiaoVienTheoLop();
            }
            else {
              alert(res.message);
            }
          }, error => console.error(error));
        }
      }
      else {
        alert(res.message);
      }
    }, error => console.error(error));
  }

  chonGiaoVienTheoLop(maLop) {
    var res: any;
    var x = {
      id: maLop,
      keyword: ""
    };
    this.http.post("https://localhost:44329/api/GiaoVien/get-form-teacher-by-class", x).subscribe(result => {
      res = result;
      if (res.success) {
        this.giaoVien = res.data;
        this.hocSinh.maGv = this.giaoVien.maGv;
        (<HTMLInputElement>document.getElementById("tenGiaoVien")).value = this.giaoVien.tenGv;
      }
      else {
        alert(res.message);
      }
    }, error => console.error(error));   
  }

  chonGiaoVienTheoId(maGv) {
    var res: any;
    var gv: any;
    var x = {
      id: maGv,
      keyword: ""
    };
    this.http.post("https://localhost:44329/api/GiaoVien/get-by-id", x).subscribe(result => {
      res = result;
      if (res.success) {
        gv = res.data;
        (<HTMLInputElement>document.getElementById("tenGiaoVien")).value = gv.tenGv;
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
        this.clearModal();
        this.danhSachHocSinhTheoLop(1);
        $('#modalEditHocSinh').modal('hide');
      }
      else {
        alert(res.message);
      }
    }, error => console.error(error)); 
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
        this.clearModal();
        $('#modalEditHocSinh').modal('hide');
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

  openModalEditHocSinh(index) {
    this.hocSinh = this.listHocSinh.data[index];
    this.hocSinh.ngaySinh = this.listHocSinh.data[index].ngaySinh.split("T")[0];
    this.chonGiaoVienTheoId(this.hocSinh.maGv);
    $('#modalEditHocSinh').modal('show');  
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
    }
  }
}
