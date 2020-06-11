using System;
using System.Collections.Generic;

namespace QLLH.DAL.Models
{
    public partial class NgayHoc
    {
        public NgayHoc()
        {
            ThoiKhoaBieu = new HashSet<ThoiKhoaBieu>();
        }

        public int MaNgay { get; set; }
        public string TenNgay { get; set; }

        public virtual ICollection<ThoiKhoaBieu> ThoiKhoaBieu { get; set; }
    }
}
