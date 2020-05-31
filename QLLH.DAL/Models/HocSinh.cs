using System;
using System.Collections.Generic;

namespace QLLH.DAL.Models
{
    public partial class HocSinh
    {
        public int MaHs { get; set; }
        public string TenHs { get; set; }
        public int? MaGv { get; set; }
        public int? MaLop { get; set; }
        public DateTime? NgaySinh { get; set; }
        public string GioiTinh { get; set; }
        public string DiaChi { get; set; }

        public virtual GiaoVien MaGvNavigation { get; set; }
        public virtual Lop MaLopNavigation { get; set; }
    }
}
