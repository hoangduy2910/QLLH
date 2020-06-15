create database QuanLyLopHoc;
go
use QuanLyLopHoc;
go

--- Chuc vu ---
create table ChucVu (
	MaCV int identity(1,1),
	TenCV nvarchar(50),
	primary key (MaCV)
);
go
create proc ThemChucVu @TenCV nvarchar(50)
as
insert into ChucVu (TenCV)
values (@TenCV)
go
exec ThemChucVu N'Quản trị'
exec ThemChucVu N'Giáo viên'
go

--- Tiet hoc ---
create table TietHoc (
	MaTiet int identity(1,1),
	ThoiGian nvarchar(50),
	primary key (MaTiet)
);
go
create proc ThemTietHoc @ThoiGian nvarchar(50)
as
insert into TietHoc (ThoiGian)
values (@ThoiGian)
go
exec ThemTietHoc N'7 đến 7:45'
exec ThemTietHoc N'7:45 đến 8:30'
exec ThemTietHoc N'8:30 đến 9'
exec ThemTietHoc N'9:45 đến 10:30'
exec ThemTietHoc N'10:30 đến 11:15'
exec ThemTietHoc N'13 đến 13:45'
exec ThemTietHoc N'13:45 đến 14:30'
exec ThemTietHoc N'14:30 đến 15:15'
exec ThemTietHoc N'15:45 đến 16:30'
exec ThemTietHoc N'16:30 đến 17'
go

--- Ngay hoc ---
create table NgayHoc (
	MaNgay int identity(1,1),
	TenNgay nvarchar(50),
	primary key (MaNgay)
);
go
create proc ThemNgayHoc @TenNgay nvarchar(50)
as
insert into NgayHoc (TenNgay)
values (@TenNgay)
go
exec ThemNgayHoc N'Thứ 2'
exec ThemNgayHoc N'Thứ 3'
exec ThemNgayHoc N'Thứ 4'
exec ThemNgayHoc N'Thứ 5'
exec ThemNgayHoc N'Thứ 6'
exec ThemNgayHoc N'Thứ 7'
go

--- Lop ---
create table Lop (
	MaLop int identity(1,1) primary key,
	TenLop nvarchar(50)
);
go
create proc ThemLop @TenLop nvarchar(50)
as
insert into Lop	(TenLop)
values (@TenLop)
go
exec ThemLop N'Chưa chỉ định'
exec ThemLop '10A1'
exec ThemLop '10A2'
exec ThemLop '10A3'
exec ThemLop '10A4'
exec ThemLop '10A5'
exec ThemLop '11A1'
exec ThemLop '11A2'
exec ThemLop '11A3'
exec ThemLop '11A4'
exec ThemLop '11A5'
exec ThemLop '12A1'
exec ThemLop '12A2'
exec ThemLop '12A3'
exec ThemLop '12A4'
exec ThemLop '12A5'
go

--- Mon hoc ---
create table MonHoc (
	MaMH int identity(1,1),
	TenMH nvarchar(50),
	primary key (MaMH),
);
go
create proc ThemMonHoc @TenMH nvarchar(50)
as
insert into MonHoc(TenMH)
values (@TenMH)
go
exec ThemMonHoc N''
exec ThemMonHoc N'Toán học'
exec ThemMonHoc N'Vật lý'
exec ThemMonHoc N'Hóa học'
exec ThemMonHoc N'Sinh học'
exec ThemMonHoc N'Lịch sử'
exec ThemMonHoc N'Địa lý'
exec ThemMonHoc N'Ngữ văn'
exec ThemMonHoc N'Giáo dục'
exec ThemMonHoc N'Tiếng anh'
exec ThemMonHoc N'Thể dục'
exec ThemMonHoc N'Quốc phòng'
exec ThemMonHoc N'Tin học'
go

--- Giao vien ---
create table GiaoVien (
	MaGV int identity(1,1),
	TenGV nvarchar(50),
	MaMH int,
	MaLop int,
	NgaySinh date,
	GioiTinh nvarchar(5),
	DiaChi nvarchar(100),
	SoDT nvarchar(20),
	MaCV int,
	primary key (MaGV),
	foreign key (MaMH) references MonHoc(MaMH),
	foreign key (MaLop) references Lop(MaLop),
	foreign key (MaCV) references ChucVu(MaCV),
);
go
create proc ThemGiaoVien @TenGV nvarchar(50), @MaMH int,  @MaLop int, @NgaySinh date, @GioiTinh nvarchar(5), @DiaChi nvarchar(100), @SoDT nvarchar(20), @MaCV int
as
insert into GiaoVien (TenGV, MaMH, MaLop, NgaySinh, GioiTinh, DiaChi, SoDT, MaCV)
values (@TenGV, @MaMH, @MaLop, @NgaySinh, @GioiTinh, @DiaChi, @SoDT, @MaCV)
go
exec ThemGiaoVien N'Chưa chỉ định', null, null, null, null, null, null, null
exec ThemGiaoVien N'Phan Thị Minh', 2, 2, '1965-01-20', N'Nam', N'Hồ Chí Minh', '0914684595', 2
exec ThemGiaoVien N'Huỳnh Văn Nhứt', 3, 3, '1965-01-20', N'Nam', N'Hồ Chí Minh', '0914113578', 2
exec ThemGiaoVien N'Trần Thanh An', 4, 4, '1965-01-20', N'Nữ', N'Hồ Chí Minh', '0914189898', 2
exec ThemGiaoVien N'Trần Thị Thanh Hảo', 5, 5, '1965-01-20', N'Nữ', N'Hồ Chí Minh', '0914560298', 2
exec ThemGiaoVien N'Ngô Thị Thu An', 6, 6, '1965-01-20', N'Nữ', N'Hồ Chí Minh', '0944929638', 2
exec ThemGiaoVien N'Nguyễn Vĩnh Bảo', 7, 7, '1965-01-20', N'Nam', N'Hồ Chí Minh', '0983052703', 2
exec ThemGiaoVien N'Lê Thị Bích', 8, 8, '1965-01-20', N'Nữ', N'Hồ Chí Minh', '0917550153', 2
exec ThemGiaoVien N'Nguyễn Thị Chi', 9, 9, '1965-01-20', N'Nữ', N'Hồ Chí Minh', '0919316165', 2
exec ThemGiaoVien N'Trương Quang Chính', 10, 10, '1965-01-20', N'Nam', N'Hồ Chí Minh', '0986787750', 2
exec ThemGiaoVien N'Đinh Thị Quỳnh Dao', 11, 11, '1965-01-20', N'Nữ', N'Hồ Chí Minh', '0986625682', 2
exec ThemGiaoVien N'Nguyễn Thị Thuỳ Dương',	12, 12, '1976-02-12', N'Nữ', N'Hồ Chí Minh', '0912739924', 2	
exec ThemGiaoVien N'Nguyễn Văn Hùng', 13, 13, '1965-01-09', N'Nam', N'Hồ Chí Minh', '0912739924', 2	

exec ThemGiaoVien N'Đoàn Thi Đương', 2, 14, '1976-02-12', N'Nữ', N'Hồ Chí Minh', '01694897447', 2
exec ThemGiaoVien N'Hồ Thị Quỳnh Giang', 3, 15, '1976-02-12', N'Nữ', N'Hồ Chí Minh', '0935062406', 2
exec ThemGiaoVien N'Mai Thị Thu Hà', 4, 16, '1976-02-12', N'Nữ', N'Hồ Chí Minh', '0984812427', 2
exec ThemGiaoVien N'Nguyễn Thị Thu Hà',	5, 1, '1976-02-12', N'Nữ', N'Hồ Chí Minh', '0935800308', 2
exec ThemGiaoVien N'Phạm Thanh Hải', 6, 1, '1976-02-12', N'Nam', N'Hồ Chí Minh', '0984390360', 2
exec ThemGiaoVien N'Nguyễn Thị Bích Hạnh', 7, 1, '1976-02-12', N'Nữ', N'Hồ Chí Minh', '0944129625', 2
exec ThemGiaoVien N'Nguyễn Thị Ái Hằng', 8, 1, '1976-02-12', N'Nữ', N'Hồ Chí Minh', '0975833679', 2
exec ThemGiaoVien N'Võ Thị Minh Hiền', 9, 1, '1976-02-12', N'Nữ', N'Hồ Chí Minh', '01225120523', 2
exec ThemGiaoVien N'Nguyễn Thuỳ Nữ Hiệp', 10, 1, '1976-02-12', N'Nữ', N'Hồ Chí Minh', '0905171005', 2
exec ThemGiaoVien N'Nguyễn Thị Minh Hiếu', 11, 1, '1976-02-12', N'Nam', N'Hồ Chí Minh', '0907856599', 2
exec ThemGiaoVien N'Đoàn Nhân Hoàng', 12, 1, '1976-02-12', N'Nam', N'Hồ Chí Minh', '0935076113', 2
exec ThemGiaoVien N'Hoàng Công Huy', 13, 1, '1976-03-12', N'Nam', N'Hồ Chí Minh', '0912739924', 2	
go

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
go
create proc ThemHocSinh @TenHS nvarchar(50), @MaGV int, @MaLop int, @NgaySinh date, @GioiTinh nvarchar(5), @DiaChi nvarchar(100)
as
insert into HocSinh (TenHS, MaGV, MaLop, NgaySinh, GioiTinh, DiaChi)
values (@TenHS, @MaGV, @MaLop, @NgaySinh, @GioiTinh, @DiaChi)
go
exec ThemHocSinh N'Phạm Loan Anh', 2, 2, '2001-01-01', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Thảo Duy', 2, 2, '2001-01-01', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Phạm Hữu Đang', 2, 2, '2001-01-01', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Võ Trương Hải Đăng', 2, 2, '2001-01-01', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Mạc Đình Giãng', 2, 2, '2001-01-01', N'Nữ', N'Hồ Chí Minh'

exec ThemHocSinh N'Lê Khã Ái', 3, 3, '2001-02-02', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Lê Thúy Ái', 3, 3, '2001-02-02', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Trọng Ái', 3, 3, '2001-02-02', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Trần Phạm Thành An', 3, 3, '2001-02-02', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Đoàn Thị Kiều Anh', 3, 3, '2001-02-02', N'Nữ', N'Hồ Chí Minh'

exec ThemHocSinh N'Ngô Thị Kim Cương', 4, 4, '2001-03-03', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Phương Dung', 4, 4, '2001-03-03', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Trùng Dương', 4, 4, '2001-03-03', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Đặng Thị Kim Đan', 4, 4, '2001-03-03', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Tấn Đạt', 4, 4, '2001-03-03', N'Nam', N'Hồ Chí Minh'

exec ThemHocSinh N'Dương Mỹ Duyên', 5, 5, '2001-01-01', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Lê Thị Ý Dương', 5, 5, '2001-01-01', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Mạc Bảo Đang', 5, 5, '2001-01-01', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Ngọc Giàu', 5, 5, '2001-01-01', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Mạc Khánh Hồ', 5, 5, '2001-01-01', N'Nữ', N'Hồ Chí Minh'

exec ThemHocSinh N'Nguyễn Thái Anh', 6, 6, '2001-01-02', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Thị Cẩm Duyên', 6, 6, '2001-01-02', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Đặng Thùy Dương', 6, 6, '2001-01-02', N'Nũ', N'Hồ Chí Minh'
exec ThemHocSinh N'Đỗ Minh Đấu', 6, 6, '2001-01-02', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Hồ Nhựt Ghi', 6, 6, '2001-01-02', N'Nam', N'Hồ Chí Minh'

exec ThemHocSinh N'Phạm Vũ An', 7, 7, '2000-01-03', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Thạch Thị Bảo Chân', 7, 7, '2000-01-03', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Lê Văn Chiêu', 7, 7, '2000-01-03', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Thị Phương Dung', 7, 7, '2000-01-03', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Lưu Bùng Hụi', 7, 7, '2000-01-03', N'Nam', N'Hồ Chí Minh'

exec ThemHocSinh N'Trương Minh Công', 8, 8, '2000-01-01', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Quách Văn Đặng', 8, 8, '2000-01-01', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Nhật Hào', 8, 8, '2000-01-01', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Lê Như Huỳnh', 8, 8, '2000-01-01', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Đỗ Nhật Huỳnh', 8, 8, '2000-01-01', N'Nam', N'Hồ Chí Minh'

exec ThemHocSinh N'Phạm Văn Bắc', 9, 9, '2000-01-02', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Võ Thị Bé', 9, 9, '2000-01-02', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Khánh Duy', 9, 9, '2000-01-02', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Phạm Hữu Đang', 9, 9, '2000-01-02', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Thái Thanh Điền', 9, 9, '2000-01-02', N'Nam', N'Hồ Chí Minh'

exec ThemHocSinh N'Lê Thị Huế Anh', 10, 10, '2000-01-03', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Đức Anh', 10, 10, '2000-01-03', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Trịnh Kiều Diễm', 10, 10, '2000-01-03', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Nhứt Dùng', 10, 10, '2000-01-03', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Trương Nhật Hào', 10, 10, '2000-01-03', N'Nam', N'Hồ Chí Minh'

exec ThemHocSinh N'Phạm Loan Anh', 11, 11, '2000-01-01', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Thảo Duy', 11, 11, '2000-01-01', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Phạm Hữu Đang', 11, 11, '2000-01-01', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Võ Trương Hải Đăng', 11, 11, '2000-01-01', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Mạc Đình Giãng', 11, 11, '2000-01-01', N'Nữ', N'Hồ Chí Minh'

exec ThemHocSinh N'Lê Khã Ái', 12, 12, '1999-02-02', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Lê Thúy Ái', 12, 12, '1999-02-02', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Trọng Ái', 12, 12, '1999-02-02', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Trần Phạm Thành An', 12, 12, '1999-02-02', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Đoàn Thị Kiều Anh', 12, 12, '1999-02-02', N'Nữ', N'Hồ Chí Minh'

exec ThemHocSinh N'Ngô Thị Kim Cương', 13, 13, '1999-03-03', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Phương Dung', 13, 13, '1999-03-03', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Trùng Dương', 13, 13, '1999-03-03', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Đặng Thị Kim Đan', 13, 13, '1999-03-03', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Tấn Đạt', 13, 13, '1999-03-03', N'Nam', N'Hồ Chí Minh'

exec ThemHocSinh N'Dương Mỹ Duyên', 14, 14, '1999-01-01', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Lê Thị Ý Dương', 14, 14, '1999-01-01', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Mạc Bảo Đang', 14, 14, '1999-01-01', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Ngọc Giàu', 14, 14, '1999-01-01', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Mạc Khánh Hồ', 14, 14, '1999-01-01', N'Nữ', N'Hồ Chí Minh'

exec ThemHocSinh N'Nguyễn Thái Anh', 15, 15, '1999-01-02', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Thị Cẩm Duyên', 15, 15, '2001-01-02', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Đặng Thùy Dương', 15, 15, '1999-01-02', N'Nũ', N'Hồ Chí Minh'
exec ThemHocSinh N'Đỗ Minh Đấu', 15, 15, '1999-01-02', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Hồ Nhựt Ghi', 15, 15, '1999-01-02', N'Nam', N'Hồ Chí Minh'

exec ThemHocSinh N'Phạm Vũ An', 16, 16, '1999-01-03', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Thạch Thị Bảo Chân', 16, 16, '1999-01-03', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Lê Văn Chiêu', 16, 16, '1999-01-03', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Thị Phương Dung', 16, 16, '1999-01-03', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Lưu Bùng Hụi', 16, 16, '1999-01-03', N'Nam', N'Hồ Chí Minh'
go


--- Giao vien day lop ---
create table GiaoVienLop (
	MaGVL int identity(1,1),
	MaGV int,
	MaLop int,
	primary key (MaGVL),
	foreign key (MaGV) references GiaoVien(MaGV),
	foreign key (MaLop) references Lop(MaLop)
);
go
create proc ThemGiaoVienLop @MaGV int, @MaLop int
as
insert into GiaoVienLop (MaGV, MaLop)
values (@MaGV, @MaLop)
go
exec ThemGiaoVienLop 1, 2
exec ThemGiaoVienLop 1, 3
exec ThemGiaoVienLop 1, 4
exec ThemGiaoVienLop 1, 5
exec ThemGiaoVienLop 1, 6
exec ThemGiaoVienLop 1, 7
exec ThemGiaoVienLop 1, 8
exec ThemGiaoVienLop 1, 9
exec ThemGiaoVienLop 1, 10
exec ThemGiaoVienLop 1, 11
exec ThemGiaoVienLop 1, 12
exec ThemGiaoVienLop 1, 13
exec ThemGiaoVienLop 1, 14
exec ThemGiaoVienLop 1, 15
exec ThemGiaoVienLop 1, 16

exec ThemGiaoVienLop 1, 2
exec ThemGiaoVienLop 2, 2
exec ThemGiaoVienLop 3, 2
exec ThemGiaoVienLop 4, 2
exec ThemGiaoVienLop 5, 2
exec ThemGiaoVienLop 6, 2
exec ThemGiaoVienLop 7, 2
exec ThemGiaoVienLop 8, 2
exec ThemGiaoVienLop 9, 2
exec ThemGiaoVienLop 10, 2
exec ThemGiaoVienLop 11, 2
exec ThemGiaoVienLop 12, 2
exec ThemGiaoVienLop 13, 2
go


--- Thoi Khoa Bieu ---
create table ThoiKhoaBieu (
	MaTKB int identity(1,1),
	MaNgay int,
	MaTiet int,
	MaMH int,
	MaGV int,
	MaLop int,
	primary key (MaTKB),
	foreign key (MaTiet) references TietHoc(MaTiet),
	foreign key (MaNgay) references NgayHoc(MaNgay),
	foreign key (MaMH) references MonHoc(MaMH),
	foreign key (MaGV) references GiaoVien(MaGV),
	foreign key (MaLop) references Lop(MaLop)
);
go
create proc ThemThoiKhoaBieu @MaNgay int, @MaTiet int, @MaMH int, @MaGV int, @MaLop int
as
insert into ThoiKhoaBieu (MaNgay, MaTiet, MaMH, MaGV, MaLop)
values (@MaNgay, @MaTiet, @MaMH, @MaGV, @MaLop)
go
/*
exec ThemThoiKhoaBieu ngay, tiet, 
						mon, gv, lop 
*/

/* Khoi tao TKB 10A1 */
exec ThemThoiKhoaBieu 1, 1, 2, 2, 2
exec ThemThoiKhoaBieu 1, 2, 10, 10, 2
exec ThemThoiKhoaBieu 1, 3, 9, 9, 2
exec ThemThoiKhoaBieu 1, 4, 7, 7, 2
exec ThemThoiKhoaBieu 1, 5, 3, 3, 2
exec ThemThoiKhoaBieu 1, 6, 4, 4, 2
exec ThemThoiKhoaBieu 1, 7, 4, 4, 2
exec ThemThoiKhoaBieu 1, 8, 10, 10, 2
exec ThemThoiKhoaBieu 1, 9, 10, 10, 2
exec ThemThoiKhoaBieu 1, 10, 1, 1, 2

exec ThemThoiKhoaBieu 2, 1, 13, 13, 2
exec ThemThoiKhoaBieu 2, 2, 3, 3, 2
exec ThemThoiKhoaBieu 2, 3, 4, 4, 2
exec ThemThoiKhoaBieu 2, 4, 2, 2, 2
exec ThemThoiKhoaBieu 2, 5, 2, 2, 2
exec ThemThoiKhoaBieu 2, 6, 1, 1, 2
exec ThemThoiKhoaBieu 2, 7, 1, 1, 2
exec ThemThoiKhoaBieu 2, 8, 1, 1, 2
exec ThemThoiKhoaBieu 2, 9, 1, 1, 2
exec ThemThoiKhoaBieu 2, 10, 1, 1, 2

exec ThemThoiKhoaBieu 3, 1, 13, 13, 2
exec ThemThoiKhoaBieu 3, 2, 10, 10, 2
exec ThemThoiKhoaBieu 3, 3, 10, 10, 2
exec ThemThoiKhoaBieu 3, 4, 8, 8, 2
exec ThemThoiKhoaBieu 3, 5, 5, 5, 2
exec ThemThoiKhoaBieu 3, 6, 2, 2, 2
exec ThemThoiKhoaBieu 3, 7, 2, 2, 2
exec ThemThoiKhoaBieu 3, 8, 1, 1, 2
exec ThemThoiKhoaBieu 3, 9, 1, 1, 2
exec ThemThoiKhoaBieu 3, 10, 1, 1, 2

exec ThemThoiKhoaBieu 4, 1, 8, 8, 2
exec ThemThoiKhoaBieu 4, 2, 8, 8, 2
exec ThemThoiKhoaBieu 4, 3, 6, 6, 2
exec ThemThoiKhoaBieu 4, 4, 2, 2, 2
exec ThemThoiKhoaBieu 4, 5, 2, 2, 2
exec ThemThoiKhoaBieu 4, 6, 1, 1, 2
exec ThemThoiKhoaBieu 4, 7, 1, 1, 2
exec ThemThoiKhoaBieu 4, 8, 1, 1, 2
exec ThemThoiKhoaBieu 4, 9, 1, 1, 2
exec ThemThoiKhoaBieu 4, 10, 1, 1, 2

exec ThemThoiKhoaBieu 5, 1, 7, 7, 2
exec ThemThoiKhoaBieu 5, 2, 6, 6, 2
exec ThemThoiKhoaBieu 5, 3, 3, 3, 2
exec ThemThoiKhoaBieu 5, 4, 4, 4, 2
exec ThemThoiKhoaBieu 5, 5, 4, 4, 2
exec ThemThoiKhoaBieu 5, 6, 3, 3, 2
exec ThemThoiKhoaBieu 5, 7, 3, 3, 2
exec ThemThoiKhoaBieu 5, 8, 8, 8, 2
exec ThemThoiKhoaBieu 5, 9, 8, 8, 2
exec ThemThoiKhoaBieu 5, 10, 1, 1, 2

exec ThemThoiKhoaBieu 6, 1, 11, 11, 2
exec ThemThoiKhoaBieu 6, 2, 11, 11, 2
exec ThemThoiKhoaBieu 6, 3, 12, 12, 2
exec ThemThoiKhoaBieu 6, 4, 12, 12, 2
exec ThemThoiKhoaBieu 6, 5, 1, 1, 2
exec ThemThoiKhoaBieu 6, 6, 1, 1, 2
exec ThemThoiKhoaBieu 6, 7, 1, 1, 2
exec ThemThoiKhoaBieu 6, 8, 1, 1, 2
exec ThemThoiKhoaBieu 6, 9, 1, 1, 2
exec ThemThoiKhoaBieu 6, 10, 1, 1, 2
go
/* End */

/* Khoi tao TKB 10A2 -> 12A5 */
declare @k int = 3;
declare @i int = 1;
declare @j int = 1;

while @k <= 16
begin
	while @i <= 6
	begin
		while @j <= 10
		begin
			exec ThemThoiKhoaBieu @i, @j, 1, 1, @k
			set @j = @j + 1;
		end
		set @j = 1;
		set @i = @i + 1;
	end
	set @i = 1;
	set @k = @k + 1;
end
go
/* End */