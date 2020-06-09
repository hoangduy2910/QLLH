using System;
using System.Collections.Generic;

namespace QLLH.DAL.Models
{
    public partial class ChucVu
    {
        public ChucVu()
        {
            GiaoVien = new HashSet<GiaoVien>();
        }

        public int MaCv { get; set; }
        public string TenCv { get; set; }

        public virtual ICollection<GiaoVien> GiaoVien { get; set; }
    }
}
