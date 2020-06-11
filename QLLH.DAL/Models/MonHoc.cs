using System;
using System.Collections.Generic;

namespace QLLH.DAL.Models
{
    public partial class MonHoc
    {
        public MonHoc()
        {
            GiaoVien = new HashSet<GiaoVien>();
            ThoiKhoaBieu = new HashSet<ThoiKhoaBieu>();
        }

        public int MaMh { get; set; }
        public string TenMh { get; set; }

        public virtual ICollection<GiaoVien> GiaoVien { get; set; }
        public virtual ICollection<ThoiKhoaBieu> ThoiKhoaBieu { get; set; }
    }
}
