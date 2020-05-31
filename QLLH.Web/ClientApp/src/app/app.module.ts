import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';

import { DangNhapComponent} from './dang-nhap/dang-nhap.component';
import { QuanLyLopHocComponent } from './quan-ly-lop-hoc/quan-ly-lop-hoc.component';
import { QuanLyGiaoVienComponent } from './quan-ly-giao-vien/quan-ly-giao-vien.component';
import { QuanLyHocSinhComponent } from './quan-ly-hoc-sinh/quan-ly-hoc-sinh.component';
import { QuanLyThoiKhoaBieuComponent } from './quan-ly-thoi-khoa-bieu/quan-ly-thoi-khoa-bieu.component';
import { ChiTietLopHocComponent } from './chi-tiet-lop-hoc/chi-tiet-lop-hoc.component';
import { ChiTietThoiKhoaBieuComponent } from './chi-tiet-thoi-khoa-bieu/chi-tiet-thoi-khoa-bieu.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    QuanLyLopHocComponent,
    QuanLyGiaoVienComponent,
    QuanLyHocSinhComponent,
    QuanLyThoiKhoaBieuComponent,
    ChiTietLopHocComponent,
    ChiTietThoiKhoaBieuComponent,
    DangNhapComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: DangNhapComponent },
      { path: 'trang-chu', component: HomeComponent },
      { path: 'quan-ly-lop-hoc', component: QuanLyLopHocComponent },
      { path: 'quan-ly-giao-vien', component: QuanLyGiaoVienComponent },
      { path: 'quan-ly-hoc-sinh', component: QuanLyHocSinhComponent },
      { path: 'quan-ly-thoi-khoa-bieu', component: QuanLyThoiKhoaBieuComponent },
      { path: 'chi-tiet-lop-hoc', component: ChiTietLopHocComponent },
      { path: 'chi-tiet-thoi-khoa-bieu', component: ChiTietThoiKhoaBieuComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
