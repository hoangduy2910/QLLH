using System;
using System.Collections.Generic;

namespace QLLH.DAL.Models
{
    public partial class GiaoVien
    {
        public GiaoVien()
        {
            GiaoVienLop = new HashSet<GiaoVienLop>();
            HocSinh = new HashSet<HocSinh>();
            ThoiKhoaBieu = new HashSet<ThoiKhoaBieu>();
        }

        public int MaGv { get; set; }
        public string TenGv { get; set; }
        public int? MaMh { get; set; }
        public int? MaLop { get; set; }
        public DateTime? NgaySinh { get; set; }
        public string GioiTinh { get; set; }
        public string DiaChi { get; set; }
        public string SoDt { get; set; }
        public int? MaCv { get; set; }

        public virtual ChucVu MaCvNavigation { get; set; }
        public virtual Lop MaLopNavigation { get; set; }
        public virtual MonHoc MaMhNavigation { get; set; }
        public virtual ICollection<GiaoVienLop> GiaoVienLop { get; set; }
        public virtual ICollection<HocSinh> HocSinh { get; set; }
        public virtual ICollection<ThoiKhoaBieu> ThoiKhoaBieu { get; set; }
    }
}
