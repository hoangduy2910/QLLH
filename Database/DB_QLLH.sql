create database QuanLyLopHoc;
go
use QuanLyLopHoc;
go

--- Quan tri ---
create table QuanTri (
	MaQT int identity(1,1) primary key,
	TenQT nvarchar(50),
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
exec ThemGiaoVien N'Phan Thị Minh', 1, 2, '1965-01-20', N'Nam', N'Hồ Chí Minh', '0914684595', 2
exec ThemGiaoVien N'Huỳnh Văn Nhứt', 2, 3, '1965-01-20', N'Nam', N'Hồ Chí Minh', '0914113578', 2
exec ThemGiaoVien N'Trần Thanh An', 3, 4, '1965-01-20', N'Nữ', N'Hồ Chí Minh', '0914189898', 2
exec ThemGiaoVien N'Trần Thị Thanh Hảo', 4, 5, '1965-01-20', N'Nữ', N'Hồ Chí Minh', '0914560298', 2
exec ThemGiaoVien N'Ngô Thị Thu An', 5, 6, '1965-01-20', N'Nữ', N'Hồ Chí Minh', '0944929638', 2
exec ThemGiaoVien N'Nguyễn Vĩnh Bảo', 6, 7, '1965-01-20', N'Nam', N'Hồ Chí Minh', '0983052703', 2
exec ThemGiaoVien N'Lê Thị Bích', 7, 8, '1965-01-20', N'Nữ', N'Hồ Chí Minh', '0917550153', 2
exec ThemGiaoVien N'Nguyễn Thị Chi', 8, 9, '1965-01-20', N'Nữ', N'Hồ Chí Minh', '0919316165', 2
exec ThemGiaoVien N'Trương Quang Chính', 9, 10, '1965-01-20', N'Nam', N'Hồ Chí Minh', '0986787750', 2
exec ThemGiaoVien N'Đinh Thị Quỳnh Dao', 10, 11, '1965-01-20', N'Nữ', N'Hồ Chí Minh', '0986625682', 2
exec ThemGiaoVien N'Nguyễn Thị Thuỳ Dương',	11, 12, '1976-02-12', N'Nữ', N'Hồ Chí Minh', '0912739924', 2	
exec ThemGiaoVien N'Nguyễn Văn Hùng', 12, 1, '1965-01-09', N'Nam', N'Hồ Chí Minh', '0912739924', 2	

exec ThemGiaoVien N'Đoàn Thi Đương', 1, 13, '1976-02-12', N'Nữ', N'Hồ Chí Minh', '01694897447', 2
exec ThemGiaoVien N'Hồ Thị Quỳnh Giang', 2, 14, '1976-02-12', N'Nữ', N'Hồ Chí Minh', '0935062406', 2
exec ThemGiaoVien N'Mai Thị Thu Hà', 3, 15, '1976-02-12', N'Nữ', N'Hồ Chí Minh', '0984812427', 2
exec ThemGiaoVien N'Nguyễn Thị Thu Hà',	4, 16, '1976-02-12', N'Nữ', N'Hồ Chí Minh', '0935800308', 2
exec ThemGiaoVien N'Phạm Thanh Hải', 5, 1, '1976-02-12', N'Nam', N'Hồ Chí Minh', '0984390360', 2
exec ThemGiaoVien N'Nguyễn Thị Bích Hạnh', 6, 1, '1976-02-12', N'Nữ', N'Hồ Chí Minh', '0944129625', 2
exec ThemGiaoVien N'Nguyễn Thị Ái Hằng', 7, 1, '1976-02-12', N'Nữ', N'Hồ Chí Minh', '0975833679', 2
exec ThemGiaoVien N'Võ Thị Minh Hiền', 8, 1, '1976-02-12', N'Nữ', N'Hồ Chí Minh', '01225120523', 2
exec ThemGiaoVien N'Nguyễn Thuỳ Nữ Hiệp', 9, 1, '1976-02-12', N'Nữ', N'Hồ Chí Minh', '0905171005', 2
exec ThemGiaoVien N'Nguyễn Thị Minh Hiếu', 10, 1, '1976-02-12', N'Nam', N'Hồ Chí Minh', '0907856599', 2
exec ThemGiaoVien N'Đoàn Nhân Hoàng', 11, 1, '1976-02-12', N'Nam', N'Hồ Chí Minh', '0935076113', 2
exec ThemGiaoVien N'Hoàng Công Huy', 12, 1, '1976-03-12', N'Nam', N'Hồ Chí Minh', '0912739924', 2	
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
exec ThemHocSinh N'Phạm Loan Anh', 1, 2, '2001-01-01', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Thảo Duy', 1, 2, '2001-01-01', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Phạm Hữu Đang', 1, 2, '2001-01-01', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Võ Trương Hải Đăng', 1, 2, '2001-01-01', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Mạc Đình Giãng', 1, 2, '2001-01-01', N'Nữ', N'Hồ Chí Minh'

exec ThemHocSinh N'Lê Khã Ái', 2, 3, '2001-02-02', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Lê Thúy Ái', 2, 3, '2001-02-02', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Trọng Ái', 2, 3, '2001-02-02', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Trần Phạm Thành An', 2, 3, '2001-02-02', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Đoàn Thị Kiều Anh', 2, 3, '2001-02-02', N'Nữ', N'Hồ Chí Minh'

exec ThemHocSinh N'Ngô Thị Kim Cương', 3, 4, '2001-03-03', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Phương Dung', 3, 4, '2001-03-03', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Trùng Dương', 3, 4, '2001-03-03', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Đặng Thị Kim Đan', 3, 4, '2001-03-03', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Tấn Đạt	', 3, 4, '2001-03-03', N'Nam', N'Hồ Chí Minh'

exec ThemHocSinh N'Dương Mỹ Duyên', 4, 5, '2001-01-01', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Lê Thị Ý Dương', 4, 5, '2001-01-01', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Mạc Bảo Đang', 4, 5, '2001-01-01', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Ngọc Giàu', 4, 5, '2001-01-01', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Mạc Khánh Hồ', 4, 5, '2001-01-01', N'Nữ', N'Hồ Chí Minh'

exec ThemHocSinh N'Nguyễn Thái Anh', 5, 6, '2001-01-02', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Thị Cẩm Duyên', 5, 6, '2001-01-02', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Đặng Thùy Dương', 5, 6, '2001-01-02', N'Nũ', N'Hồ Chí Minh'
exec ThemHocSinh N'Đỗ Minh Đấu', 5, 6, '2001-01-02', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Hồ Nhựt Ghi', 5, 6, '2001-01-02', N'Nam', N'Hồ Chí Minh'

exec ThemHocSinh N'Phạm Vũ An', 6, 7, '2000-01-03', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Thạch Thị Bảo Chân', 6, 7, '2000-01-03', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Lê Văn Chiêu', 6, 7, '2000-01-03', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Thị Phương Dung', 6, 7, '2000-01-03', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Lưu Bùng Hụi', 6, 7, '2000-01-03', N'Nam', N'Hồ Chí Minh'

exec ThemHocSinh N'Trương Minh Công', 7, 8, '2000-01-01', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Quách Văn Đặng', 7, 8, '2000-01-01', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Nhật Hào', 7, 8, '2000-01-01', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Lê Như Huỳnh', 7, 8, '2000-01-01', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Đỗ Nhật Huỳnh', 7, 8, '2000-01-01', N'Nam', N'Hồ Chí Minh'

exec ThemHocSinh N'Phạm Văn Bắc', 8, 9, '2000-01-02', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Võ Thị Bé', 8, 9, '2000-01-02', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Khánh Duy', 8, 9, '2000-01-02', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Phạm Hữu Đang', 8, 9, '2000-01-02', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Thái Thanh Điền', 8, 9, '2000-01-02', N'Nam', N'Hồ Chí Minh'

exec ThemHocSinh N'Lê Thị Huế Anh', 9, 10, '2000-01-03', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Đức Anh', 9, 10, '2000-01-03', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Trịnh Kiều Diễm', 9, 10, '2000-01-03', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Nhứt Dùng', 9, 10, '2000-01-03', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Trương Nhật Hào', 9, 10, '2000-01-03', N'Nam', N'Hồ Chí Minh'

exec ThemHocSinh N'Phạm Loan Anh', 10, 11, '2000-01-01', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Thảo Duy', 10, 11, '2000-01-01', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Phạm Hữu Đang', 10, 11, '2000-01-01', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Võ Trương Hải Đăng', 10, 11, '2000-01-01', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Mạc Đình Giãng', 10, 11, '2000-01-01', N'Nữ', N'Hồ Chí Minh'

exec ThemHocSinh N'Lê Khã Ái', 11, 12, '1999-02-02', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Lê Thúy Ái', 11, 12, '1999-02-02', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Trọng Ái', 11, 12, '1999-02-02', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Trần Phạm Thành An', 11, 12, '1999-02-02', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Đoàn Thị Kiều Anh', 11, 12, '1999-02-02', N'Nữ', N'Hồ Chí Minh'

exec ThemHocSinh N'Ngô Thị Kim Cương', 12, 13, '1999-03-03', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Phương Dung', 12, 13, '1999-03-03', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Trùng Dương', 12, 13, '1999-03-03', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Đặng Thị Kim Đan', 12, 13, '1999-03-03', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Tấn Đạt', 12, 13, '1999-03-03', N'Nam', N'Hồ Chí Minh'

exec ThemHocSinh N'Dương Mỹ Duyên', 13, 14, '1999-01-01', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Lê Thị Ý Dương', 13, 14, '1999-01-01', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Mạc Bảo Đang', 13, 14, '1999-01-01', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Ngọc Giàu', 13, 14, '1999-01-01', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Mạc Khánh Hồ', 13, 14, '1999-01-01', N'Nữ', N'Hồ Chí Minh'

exec ThemHocSinh N'Nguyễn Thái Anh', 14, 15, '1999-01-02', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Thị Cẩm Duyên', 14, 15, '2001-01-02', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Đặng Thùy Dương', 14, 15, '1999-01-02', N'Nũ', N'Hồ Chí Minh'
exec ThemHocSinh N'Đỗ Minh Đấu', 14, 15, '1999-01-02', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Hồ Nhựt Ghi', 14, 15, '1999-01-02', N'Nam', N'Hồ Chí Minh'

exec ThemHocSinh N'Phạm Vũ An', 15, 16, '1999-01-03', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Thạch Thị Bảo Chân', 15, 16, '1999-01-03', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Lê Văn Chiêu', 15, 16, '1999-01-03', N'Nam', N'Hồ Chí Minh'
exec ThemHocSinh N'Nguyễn Thị Phương Dung', 15, 16, '1999-01-03', N'Nữ', N'Hồ Chí Minh'
exec ThemHocSinh N'Lưu Bùng Hụi', 15, 16, '1999-01-03', N'Nam', N'Hồ Chí Minh'
go


--- Giao vien day lop ---
create table GiaoVienLop (
	MaGV int,
	MaLop int,
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
go


--- Thoi Khoa Bieu ---
create table ThoiKhoaBieu (
	MaNgay int,
	MaTiet int,
	MaMH int,
	MaGV int,
	MaLop int,
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
exec ThemThoiKhoaBieu 1, 1, 1, 1, 2
exec ThemThoiKhoaBieu 1, 2, 9, 9, 2
exec ThemThoiKhoaBieu 1, 3, 8, 8, 2
exec ThemThoiKhoaBieu 1, 4, 6, 6, 2
exec ThemThoiKhoaBieu 1, 5, 2, 2, 2
exec ThemThoiKhoaBieu 1, 6, 3, 3, 2
exec ThemThoiKhoaBieu 1, 7, 3, 3, 2
exec ThemThoiKhoaBieu 1, 8, 9, 9, 2
exec ThemThoiKhoaBieu 1, 9, 9, 9, 2

exec ThemThoiKhoaBieu 2, 1, 12, 12, 2
exec ThemThoiKhoaBieu 2, 2, 2, 2, 2
exec ThemThoiKhoaBieu 2, 3, 3, 3, 2
exec ThemThoiKhoaBieu 2, 4, 1, 1, 2
exec ThemThoiKhoaBieu 2, 5, 1, 1, 2

exec ThemThoiKhoaBieu 3, 1, 12, 12, 2
exec ThemThoiKhoaBieu 3, 2, 9, 9, 2
exec ThemThoiKhoaBieu 3, 3, 9, 9, 2
exec ThemThoiKhoaBieu 3, 4, 7, 7, 2
exec ThemThoiKhoaBieu 3, 5, 4, 4, 2
exec ThemThoiKhoaBieu 3, 6, 1, 1, 2
exec ThemThoiKhoaBieu 3, 7, 1, 1, 2

exec ThemThoiKhoaBieu 4, 1, 7, 7, 2
exec ThemThoiKhoaBieu 4, 2, 7, 7, 2
exec ThemThoiKhoaBieu 4, 3, 5, 5, 2
exec ThemThoiKhoaBieu 4, 4, 1, 1, 2
exec ThemThoiKhoaBieu 4, 5, 1, 1, 2

exec ThemThoiKhoaBieu 5, 1, 6, 6, 2
exec ThemThoiKhoaBieu 5, 2, 5, 5, 2
exec ThemThoiKhoaBieu 5, 3, 2, 2, 2
exec ThemThoiKhoaBieu 5, 4, 3, 3, 2
exec ThemThoiKhoaBieu 5, 5, 3, 3, 2
exec ThemThoiKhoaBieu 5, 6, 2, 2, 2
exec ThemThoiKhoaBieu 5, 7, 2, 2, 2
exec ThemThoiKhoaBieu 5, 8, 7, 7, 2
exec ThemThoiKhoaBieu 5, 9, 7, 7, 2

exec ThemThoiKhoaBieu 6, 1, 10, 10, 2
exec ThemThoiKhoaBieu 6, 2, 10, 10, 2
exec ThemThoiKhoaBieu 6, 3, 11, 11, 2
exec ThemThoiKhoaBieu 6, 4, 11, 11, 2
go