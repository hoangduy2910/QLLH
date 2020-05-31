create database QuanLyLopHoc;

use QuanLyLopHoc;

--- Quan tri ---
create table QuanTri (
	MaQuanTri int identity(1,1) primary key,
	TenQuanTri nvarchar(50),
	NgaySinh date,
	GioiTinh nvarchar(5),
	DiaChi nvarchar(100),
	SoDT nvarchar(20),
);

create proc ThemQuanTri @TenQuanTri nvarchar(50), @NgaySinh date, @GioiTinh nvarchar(5), @DiaChi nvarchar(100), @SoDT nvarchar(20)
as
insert into QuanTri (TenQuanTri, NgaySinh, GioiTinh, DiaChi, SoDT)
values (@TenQuanTri, @NgaySinh, @GioiTinh, @DiaChi, @SoDT)

exec ThemQuanTri N'Phạm Thanh Hải', '22/04/1978', N'Nam', N'Hồ Chí Minh', '0976575475'
exec ThemQuanTri N'Nguyễn Thị Minh Hiếu', '20/08/1967', N'Nam', N'Hồ Chí Minh', '0907856599'


--- Tiet hoc ---
create table TietHoc (
	MaTiet int identity(1,1),
	ThoiGian nvarchar(50),
	primary key (MaTiet)
);

create proc ThemTietHoc @ThoiGian nvarchar(50)
as
insert into TietHoc (ThoiGian)
values (@ThoiGian)

exec ThemTietHoc N'7 đến 7:45'
exec ThemTietHoc N'7:45 đến 8:30'
exec ThemTietHoc N'8:30 đến 9'
exec ThemTietHoc N'9 đến 9:45'
exec ThemTietHoc N'9:45 đến 10:30'
exec ThemTietHoc N'10:30 đến 11:15'
exec ThemTietHoc N'1 đến 1:45'
exec ThemTietHoc N'1:45 đến 2:30'
exec ThemTietHoc N'2:30 đến 3:15'
exec ThemTietHoc N'3:15 đến 3:45'
exec ThemTietHoc N'3:45 đến 4:30'
exec ThemTietHoc N'4:30 đến 5'


--- Lop ---
create table Lop (
	MaLop int identity(1,1) primary key,
	TenLop nvarchar(50),
);

create proc ThemLop @TenLop nvarchar(50)
as
insert into Lop	(TenLop)
values (@TenLop)

exec ThemLop '10A1'
exec ThemLop '10A2'
exec ThemLop '10A3'
exec ThemLop '11A1'
exec ThemLop '11A2'
exec ThemLop '11A3'
exec ThemLop '12A1'
exec ThemLop '12A2'
exec ThemLop '12A3'


--- Mon hoc ---
create table MonHoc (
	MaMH int identity(1,1),
	TenMH nvarchar(50),
	primary key (MaMH),
);

create proc ThemMonHoc @TenMH nvarchar(50)
as
insert into MonHoc(TenMH)
values (@TenMH)

exec ThemMonHoc N'Toán học'
exec ThemMonHoc N'Vật lý'
exec ThemMonHoc N'Hóa học'
exec ThemMonHoc N'Sinh học'
exec ThemMonHoc N'Lịch sử'
exec ThemMonHoc N'Địa lý'
exec ThemMonHoc N'Ngữ văn'
exec ThemMonHoc N'Giáo dục công dân'
exec ThemMonHoc N'Tiếng anh'
exec ThemMonHoc N'Thể dục'


--- Giao vien ---
create table GiaoVien (
	MaGV int identity(1,1),
	TenGV nvarchar(50),
	MaMH int,
	NgaySinh date,
	GioiTinh nvarchar(5),
	DiaChi nvarchar(100),
	SoDT nvarchar(20),
	primary key (MaGV),
	foreign key (MaMH) references MonHoc(MaMH)
);

create proc ThemGiaoVien @TenGV nvarchar(50), @MaMH nvarchar(10), @NgaySinh date, @GioiTinh nvarchar(5), @DiaChi nvarchar(100), @SoDT nvarchar(20)
as
insert into GiaoVien (TenGV, MaMH, NgaySinh, GioiTinh, DiaChi, SoDT)
values (@TenGV, @MaMH, @NgaySinh, @GioiTinh, @DiaChi, @SoDT)

exec ThemGiaoVien N'Phan Thị Minh', 1, '1965-01-20', N'Nam', N'Hồ Chí Minh', '0914684595'
exec ThemGiaoVien N'Huỳnh Văn Nhứt', 2, '1965-01-20', N'Nam', N'Hồ Chí Minh', '0914113578'
exec ThemGiaoVien N'Trần Thanh An', 3, '1965-01-20', N'Nữ', N'Hồ Chí Minh', '0914189898'
exec ThemGiaoVien N'Trần Thị Thanh Hảo', 4, '1965-01-20', N'Nữ', N'Hồ Chí Minh', '0914560298'
exec ThemGiaoVien N'Ngô Thị Thu An', 5, '1965-01-20', N'Nữ', N'Hồ Chí Minh', '0944929638'
exec ThemGiaoVien N'Nguyễn Vĩnh Bảo', 6, '1965-01-20', N'Nam', N'Hồ Chí Minh', '0983052703'
exec ThemGiaoVien N'Lê Thị Bích', 7, '1965-01-20', N'Nữ', N'Hồ Chí Minh', '0917550153'
exec ThemGiaoVien N'Nguyễn Thị Chi', 8, '1965-01-20', N'Nữ', N'Hồ Chí Minh', '0919316165'
exec ThemGiaoVien N'Trương Quang Chính', 9, '1965-01-20', N'Nam', N'Hồ Chí Minh', '0986787750'
exec ThemGiaoVien N'Đinh Thị Quỳnh Dao', 10, '1965-01-20', N'Nữ', N'Hồ Chí Minh', '0986625682'


--- Hoc sinh ---
create table HocSinh (
	MaHS int identity(1,1),
	TenHS nvarchar(50),
	MaGV int,
	MaLop int,
	NgaySinh date,
	GioiTinh nvarchar(5),
	DiaChi nvarchar(100),
	primary key (MaHS),
	foreign key (MaGV) references GiaoVien(MaGV),
	foreign key (MaLop) references Lop(MaLop)
);

create proc ThemHocSinh @TenHS nvarchar(50), @MaGV int, @MaLop int, @NgaySinh date, @GioiTinh nvarchar(5), @DiaChi nvarchar(100)
as
insert into HocSinh (TenHS, MaGV, MaLop, NgaySinh, GioiTinh, DiaChi)
values (@TenHS, @MaGV, @MaLop, @NgaySinh, @GioiTinh, @DiaChi)

exec ThemHocSinh N'Phạm Loan Anh', 1, 1, '2001-01-01', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Thảo Duy', 1, 1, '2001-01-01', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Phạm Hữu Đang', 1, 1, '2001-01-01', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Võ Trương Hải Đăng', 1, 1, '2001-01-01', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Mạc Đình Giãng', 1, 1, '2001-01-01', N'Nữ', N'Hồ Chí Minh'

exec ThemHocSinh N'Lê Khã Ái', 2, 2, '2001-02-02', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Lê Thúy Ái', 2, 2, '2001-02-02', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Trọng Ái', 2, 2, '2001-02-02', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Trần Phạm Thành An', 2, 2, '2001-02-02', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Đoàn Thị Kiều Anh', 2, 2, '2001-02-02', N'Nữ', N'Hồ Chí Minh'

exec ThemHocSinh N'Ngô Thị Kim Cương', 3, 3, '2001-03-03', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Phương Dung', 3, 3, '2001-03-03', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Trùng Dương', 3, 3, '2001-03-03', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Đặng Thị Kim Đan', 3, 3, '2001-03-03', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Tấn Đạt	', 3, 3, '2001-03-03', N'Nam', N'Hồ Chí Minh'

exec ThemHocSinh N'Dương Mỹ Duyên', 4, 4, '2000-01-01', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Lê Thị Ý Dương', 4, 4, '2000-01-01', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Mạc Bảo Đang', 4, 4, '2000-01-01', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Ngọc Giàu', 4, 4, '2000-01-01', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Mạc Khánh Hồ', 4, 4, '2000-01-01', N'Nữ', N'Hồ Chí Minh'

exec ThemHocSinh N'Nguyễn Thái Anh', 5, 5, '2000-01-02', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Thị Cẩm Duyên', 5, 5, '2000-01-02', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Đặng Thùy Dương', 5, 5, '2000-01-02', N'Nũ', N'Hồ Chí Minh'
exec ThemHocSinh N'Đỗ Minh Đấu', 5, 5, '2000-01-02', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Hồ Nhựt Ghi', 5, 5, '2000-01-02', N'Nam', N'Hồ Chí Minh'

exec ThemHocSinh N'Phạm Vũ An', 6, 6, '2000-01-03', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Thạch Thị Bảo Chân', 6, 6, '2000-01-03', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Lê Văn Chiêu', 6, 6, '2000-01-03', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Thị Phương Dung', 6, 6, '2000-01-03', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Lưu Bùng Hụi', 6, 6, '2000-01-03', N'Nam', N'Hồ Chí Minh'

exec ThemHocSinh N'Trương Minh Công', 7, 7, '1999-01-01', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Quách Văn Đặng', 7, 7, '1999-01-01', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Nhật Hào', 7, 7, '1999-01-01', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Lê Như Huỳnh', 7, 7, '1999-01-01', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Đỗ Nhật Huỳnh', 7, 7, '1999-01-01', N'Nam', N'Hồ Chí Minh'

exec ThemHocSinh N'Phạm Văn Bắc', 8, 8, '1999-01-02', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Võ Thị Bé', 8, 8, '1999-01-02', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Khánh Duy', 8, 8, '1999-01-02', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Phạm Hữu Đang', 8, 8, '1999-01-02', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Thái Thanh Điền', 8, 8, '1999-01-02', N'Nam', N'Hồ Chí Minh'

exec ThemHocSinh N'Lê Thị Huế Anh', 9, 9, '1999-01-03', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Đức Anh', 9, 9, '1999-01-03', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Trịnh Kiều Diễm', 9, 9, '1999-01-03', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Nhứt Dùng', 9, 9, '1999-01-03', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Trương Nhật Hào', 9, 9, '1999-01-03', N'Nam', N'Hồ Chí Minh'


--- Giao vien day lop ---
create table GiaoVien_Lop (
	MaGV nvarchar(10),
	MaLop nvarchar(10),
	foreign key (MaGV) references GiaoVien(MaGV),
	foreign key (MaLop) references Lop(MaLop)
);


--- Thoi Khoa Bieu ---
create table ThoiKhoaBieu (
	MaGV nvarchar(10),
	MaLop nvarchar(10),
	MaTiet nvarchar(10),
	foreign key (MaGV) references GiaoVien(MaGV),
	foreign key (MaLop) references Lop(MaLop),
	foreign key (MaTiet) references TietHoc(MaTiet)
);
