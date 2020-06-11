import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

import { DangNhapComponent} from './dang-nhap/dang-nhap.component';
import { QuanLyLopHocComponent } from './quan-ly-lop-hoc/quan-ly-lop-hoc.component';
import { QuanLyGiaoVienComponent } from './quan-ly-giao-vien/quan-ly-giao-vien.component';
import { QuanLyHocSinhComponent } from './quan-ly-hoc-sinh/quan-ly-hoc-sinh.component';
import { QuanLyTkbTheoLopComponent } from './quan-ly-tkb-theo-lop/quan-ly-tkb-theo-lop.component';
import { QuanLyTkbTheoGiaoVienComponent } from './quan-ly-tkb-theo-giao-vien/quan-ly-tkb-theo-giao-vien.component';
import { ChiTietLopHocComponent } from './chi-tiet-lop-hoc/chi-tiet-lop-hoc.component';
import { ChiTietTkbTheoLopComponent } from './chi-tiet-tkb-theo-lop/chi-tiet-tkb-theo-lop.component';
import { ChiTietTkbTheoGiaoVienComponent } from './chi-tiet-tkb-theo-giao-vien/chi-tiet-tkb-theo-giao-vien.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    QuanLyLopHocComponent,
    QuanLyGiaoVienComponent,
    QuanLyHocSinhComponent,
    QuanLyTkbTheoLopComponent,
    QuanLyTkbTheoGiaoVienComponent,
    ChiTietLopHocComponent,
    ChiTietTkbTheoLopComponent,
    ChiTietTkbTheoGiaoVienComponent,
    DangNhapComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule.forRoot([
      { path: '', component: DangNhapComponent },
      { path: 'trang-chu', component: HomeComponent },
      { path: 'quan-ly-lop-hoc', component: QuanLyLopHocComponent },
      { path: 'quan-ly-giao-vien', component: QuanLyGiaoVienComponent },
      { path: 'quan-ly-hoc-sinh', component: QuanLyHocSinhComponent },
      { path: 'quan-ly-tkb-theo-lop', component: QuanLyTkbTheoLopComponent },
      { path: 'quan-ly-tkb-theo-giao-vien', component: QuanLyTkbTheoGiaoVienComponent },
      { path: 'chi-tiet-lop-hoc/:id', component: ChiTietLopHocComponent },
      { path: 'chi-tiet-tkb-theo-lop/:id', component: ChiTietTkbTheoLopComponent },
      { path: 'chi-tiet-tkb-theo-giao-vien/:id', component: ChiTietTkbTheoGiaoVienComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
