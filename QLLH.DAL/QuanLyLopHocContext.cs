using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace QLLH.DAL.Models
{
    public partial class QuanLyLopHocContext : DbContext
    {
        public QuanLyLopHocContext()
        {
        }

        public QuanLyLopHocContext(DbContextOptions<QuanLyLopHocContext> options)
            : base(options)
        {
        }

        public virtual DbSet<ChucVu> ChucVu { get; set; }
        public virtual DbSet<GiaoVien> GiaoVien { get; set; }
        public virtual DbSet<GiaoVienLop> GiaoVienLop { get; set; }
        public virtual DbSet<HocSinh> HocSinh { get; set; }
        public virtual DbSet<Lop> Lop { get; set; }
        public virtual DbSet<MonHoc> MonHoc { get; set; }
        public virtual DbSet<NgayHoc> NgayHoc { get; set; }
        public virtual DbSet<ThoiKhoaBieu> ThoiKhoaBieu { get; set; }
        public virtual DbSet<TietHoc> TietHoc { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=.\\SQLEXPRESS;Initial Catalog=QuanLyLopHoc;Persist Security Info=True;User ID=sa;Password=123;Pooling=False;MultipleActiveResultSets=False;Encrypt=False;TrustServerCertificate=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ChucVu>(entity =>
            {
                entity.HasKey(e => e.MaCv)
                    .HasName("PK__ChucVu__27258E7661483E9D");

                entity.Property(e => e.MaCv).HasColumnName("MaCV");

                entity.Property(e => e.TenCv)
                    .HasColumnName("TenCV")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<GiaoVien>(entity =>
            {
                entity.HasKey(e => e.MaGv)
                    .HasName("PK__GiaoVien__2725AEF30AAC62F9");

                entity.Property(e => e.MaGv).HasColumnName("MaGV");

                entity.Property(e => e.DiaChi).HasMaxLength(100);

                entity.Property(e => e.GioiTinh).HasMaxLength(5);

                entity.Property(e => e.MaCv).HasColumnName("MaCV");

                entity.Property(e => e.MaMh).HasColumnName("MaMH");

                entity.Property(e => e.NgaySinh).HasColumnType("date");

                entity.Property(e => e.SoDt)
                    .HasColumnName("SoDT")
                    .HasMaxLength(20);

                entity.Property(e => e.TenGv)
                    .HasColumnName("TenGV")
                    .HasMaxLength(50);

                entity.HasOne(d => d.MaCvNavigation)
                    .WithMany(p => p.GiaoVien)
                    .HasForeignKey(d => d.MaCv)
                    .HasConstraintName("FK__GiaoVien__MaCV__20C1E124");

                entity.HasOne(d => d.MaLopNavigation)
                    .WithMany(p => p.GiaoVien)
                    .HasForeignKey(d => d.MaLop)
                    .HasConstraintName("FK__GiaoVien__MaLop__1FCDBCEB");

                entity.HasOne(d => d.MaMhNavigation)
                    .WithMany(p => p.GiaoVien)
                    .HasForeignKey(d => d.MaMh)
                    .HasConstraintName("FK__GiaoVien__MaMH__1ED998B2");
            });

            modelBuilder.Entity<GiaoVienLop>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.MaGv).HasColumnName("MaGV");

                entity.HasOne(d => d.MaGvNavigation)
                    .WithMany()
                    .HasForeignKey(d => d.MaGv)
                    .HasConstraintName("FK__GiaoVienLo__MaGV__286302EC");

                entity.HasOne(d => d.MaLopNavigation)
                    .WithMany()
                    .HasForeignKey(d => d.MaLop)
                    .HasConstraintName("FK__GiaoVienL__MaLop__29572725");
            });

            modelBuilder.Entity<HocSinh>(entity =>
            {
                entity.HasKey(e => e.MaHs)
                    .HasName("PK__HocSinh__2725A6EFDD765EFF");

                entity.Property(e => e.MaHs).HasColumnName("MaHS");

                entity.Property(e => e.DiaChi).HasMaxLength(100);

                entity.Property(e => e.GioiTinh).HasMaxLength(5);

                entity.Property(e => e.MaGv).HasColumnName("MaGV");

                entity.Property(e => e.NgaySinh).HasColumnType("date");

                entity.Property(e => e.TenHs)
                    .HasColumnName("TenHS")
                    .HasMaxLength(50);

                entity.HasOne(d => d.MaGvNavigation)
                    .WithMany(p => p.HocSinh)
                    .HasForeignKey(d => d.MaGv)
                    .HasConstraintName("FK__HocSinh__MaGV__24927208");

                entity.HasOne(d => d.MaLopNavigation)
                    .WithMany(p => p.HocSinh)
                    .HasForeignKey(d => d.MaLop)
                    .HasConstraintName("FK__HocSinh__MaLop__25869641");
            });

            modelBuilder.Entity<Lop>(entity =>
            {
                entity.HasKey(e => e.MaLop)
                    .HasName("PK__Lop__3B98D2733A677456");

                entity.Property(e => e.TenLop).HasMaxLength(50);
            });

            modelBuilder.Entity<MonHoc>(entity =>
            {
                entity.HasKey(e => e.MaMh)
                    .HasName("PK__MonHoc__2725DFD9DD800756");

                entity.Property(e => e.MaMh).HasColumnName("MaMH");

                entity.Property(e => e.TenMh)
                    .HasColumnName("TenMH")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<NgayHoc>(entity =>
            {
                entity.HasKey(e => e.MaNgay)
                    .HasName("PK__NgayHoc__238109C4F2BA158A");

                entity.Property(e => e.TenNgay).HasMaxLength(50);
            });

            modelBuilder.Entity<ThoiKhoaBieu>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.MaGv).HasColumnName("MaGV");

                entity.Property(e => e.MaMh).HasColumnName("MaMH");

                entity.HasOne(d => d.MaGvNavigation)
                    .WithMany()
                    .HasForeignKey(d => d.MaGv)
                    .HasConstraintName("FK__ThoiKhoaBi__MaGV__2F10007B");

                entity.HasOne(d => d.MaLopNavigation)
                    .WithMany()
                    .HasForeignKey(d => d.MaLop)
                    .HasConstraintName("FK__ThoiKhoaB__MaLop__300424B4");

                entity.HasOne(d => d.MaMhNavigation)
                    .WithMany()
                    .HasForeignKey(d => d.MaMh)
                    .HasConstraintName("FK__ThoiKhoaBi__MaMH__2E1BDC42");

                entity.HasOne(d => d.MaNgayNavigation)
                    .WithMany()
                    .HasForeignKey(d => d.MaNgay)
                    .HasConstraintName("FK__ThoiKhoaB__MaNga__2D27B809");

                entity.HasOne(d => d.MaTietNavigation)
                    .WithMany()
                    .HasForeignKey(d => d.MaTiet)
                    .HasConstraintName("FK__ThoiKhoaB__MaTie__2C3393D0");
            });

            modelBuilder.Entity<TietHoc>(entity =>
            {
                entity.HasKey(e => e.MaTiet)
                    .HasName("PK__TietHoc__4CC209DB1C9FA1AF");

                entity.Property(e => e.ThoiGian).HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
