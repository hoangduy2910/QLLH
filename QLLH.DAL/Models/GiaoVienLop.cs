using System;
using System.Collections.Generic;

namespace QLLH.DAL.Models
{
    public partial class GiaoVienLop
    {
        public int? MaGv { get; set; }
        public int? MaLop { get; set; }

        public virtual GiaoVien MaGvNavigation { get; set; }
        public virtual Lop MaLopNavigation { get; set; }
    }
}
