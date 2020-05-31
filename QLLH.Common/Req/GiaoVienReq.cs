using System;
using System.Collections.Generic;
using System.Text;

namespace QLLH.Common.Req
{
    public class GiaoVienReq
    {
        public int MaGv { get; set; }
        public string TenGv { get; set; }
        public int? MaMh { get; set; }
        public DateTime? NgaySinh { get; set; }
        public string GioiTinh { get; set; }
        public string DiaChi { get; set; }
        public string SoDt { get; set; }
    }
}
