import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-quan-ly-tkb-theo-lop',
  templateUrl: './quan-ly-tkb-theo-lop.component.html',
  styleUrls: ['./quan-ly-tkb-theo-lop.component.css']
})
export class QuanLyTkbTheoLopComponent {
  size: number = 10;

  listLop: any = {
    data: [],
    totalRecord: 0,
    totalPage: 0,
    page: 0,
    size: 0
  };

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { 
    this.danhSachLop(1);
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
}
