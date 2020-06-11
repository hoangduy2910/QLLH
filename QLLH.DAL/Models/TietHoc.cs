using System;
using System.Collections.Generic;

namespace QLLH.DAL.Models
{
    public partial class TietHoc
    {
        public TietHoc()
        {
            ThoiKhoaBieu = new HashSet<ThoiKhoaBieu>();
        }

        public int MaTiet { get; set; }
        public string ThoiGian { get; set; }

        public virtual ICollection<ThoiKhoaBieu> ThoiKhoaBieu { get; set; }
    }
}
