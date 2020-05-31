using System;
using System.Collections.Generic;
using System.Text;

namespace QLLH.Common.Req
{
    public class HocSinhReq
    {
        public int MaHs { get; set; }
        public string TenHs { get; set; }
        public int? MaGv { get; set; }
        public int? MaLop { get; set; }
        public DateTime? NgaySinh { get; set; }
        public string GioiTinh { get; set; }
        public string DiaChi { get; set; }
    }
}
