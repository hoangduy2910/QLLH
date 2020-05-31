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

        public virtual DbSet<GiaoVien> GiaoVien { get; set; }
        public virtual DbSet<HocSinh> HocSinh { get; set; }
        public virtual DbSet<Lop> Lop { get; set; }
        public virtual DbSet<MonHoc> MonHoc { get; set; }
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
            modelBuilder.Entity<GiaoVien>(entity =>
            {
                entity.HasKey(e => e.MaGv)
                    .HasName("PK__GiaoVien__2725AEF3D98FCE2A");

                entity.Property(e => e.MaGv).HasColumnName("MaGV");

                entity.Property(e => e.DiaChi).HasMaxLength(100);

                entity.Property(e => e.GioiTinh).HasMaxLength(5);

                entity.Property(e => e.MaMh).HasColumnName("MaMH");

                entity.Property(e => e.NgaySinh).HasColumnType("date");

                entity.Property(e => e.SoDt)
                    .HasColumnName("SoDT")
                    .HasMaxLength(20);

                entity.Property(e => e.TenGv)
                    .HasColumnName("TenGV")
                    .HasMaxLength(50);

                entity.HasOne(d => d.MaMhNavigation)
                    .WithMany(p => p.GiaoVien)
                    .HasForeignKey(d => d.MaMh)
                    .HasConstraintName("FK__GiaoVien__MaMH__1920BF5C");
            });

            modelBuilder.Entity<HocSinh>(entity =>
            {
                entity.HasKey(e => e.MaHs)
                    .HasName("PK__HocSinh__2725A6EF545E3623");

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
                    .HasConstraintName("FK__HocSinh__MaGV__239E4DCF");

                entity.HasOne(d => d.MaLopNavigation)
                    .WithMany(p => p.HocSinh)
                    .HasForeignKey(d => d.MaLop)
                    .HasConstraintName("FK__HocSinh__MaLop__24927208");
            });

            modelBuilder.Entity<Lop>(entity =>
            {
                entity.HasKey(e => e.MaLop)
                    .HasName("PK__Lop__3B98D2730BFE67A0");

                entity.Property(e => e.TenLop).HasMaxLength(50);
            });

            modelBuilder.Entity<MonHoc>(entity =>
            {
                entity.HasKey(e => e.MaMh)
                    .HasName("PK__MonHoc__2725DFD9AF53BED7");

                entity.Property(e => e.MaMh).HasColumnName("MaMH");

                entity.Property(e => e.TenMh)
                    .HasColumnName("TenMH")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<TietHoc>(entity =>
            {
                entity.HasKey(e => e.MaTiet)
                    .HasName("PK__TietHoc__4CC209DB765E7F66");

                entity.Property(e => e.ThoiGian).HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
