using System;
using System.Collections.Generic;

namespace QLLH.DAL.Models
{
    public partial class Lop
    {
        public Lop()
        {
            GiaoVien = new HashSet<GiaoVien>();
            GiaoVienLop = new HashSet<GiaoVienLop>();
            HocSinh = new HashSet<HocSinh>();
            ThoiKhoaBieu = new HashSet<ThoiKhoaBieu>();
        }

        public int MaLop { get; set; }
        public string TenLop { get; set; }

        public virtual ICollection<GiaoVien> GiaoVien { get; set; }
        public virtual ICollection<GiaoVienLop> GiaoVienLop { get; set; }
        public virtual ICollection<HocSinh> HocSinh { get; set; }
        public virtual ICollection<ThoiKhoaBieu> ThoiKhoaBieu { get; set; }
    }
}
