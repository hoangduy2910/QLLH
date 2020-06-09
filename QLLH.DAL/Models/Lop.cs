using System;
using System.Collections.Generic;

namespace QLLH.DAL.Models
{
    public partial class Lop
    {
        public Lop()
        {
            GiaoVien = new HashSet<GiaoVien>();
            HocSinh = new HashSet<HocSinh>();
        }

        public int MaLop { get; set; }
        public string TenLop { get; set; }

        public virtual ICollection<GiaoVien> GiaoVien { get; set; }
        public virtual ICollection<HocSinh> HocSinh { get; set; }
    }
}
