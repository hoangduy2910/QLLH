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
    var gvlOld = {
      maGvl: 0,
      maGv: 0,
      maLop: 0,
      maMh: 0
    };
    var gvlNew: any;

    var x = {
      maLop: this.maLop,
      maMh: maMh
    };
    this.http.post("https://localhost:44329/api/GiaoVienLop/get-by-subject-and-class", x).subscribe(result => {
      res = result;
      if (res.success) {
        if (res.data) {
          gvlOld = res.data;

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
        else {
          // alert("Chưa tạo giáo viên lớp");
          var y = {
            maGvl: 0,
            maGv: parseInt(maGvNew),
            maLop: this.maLop
          };
          this.http.post("https://localhost:44329/api/GiaoVienLop/create", y).subscribe(result => {
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
