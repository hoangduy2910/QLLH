using System;
using System.Collections.Generic;

namespace QLLH.DAL.Models
{
    public partial class GiaoVien
    {
        public GiaoVien()
        {
            HocSinh = new HashSet<HocSinh>();
        }

        public int MaGv { get; set; }
        public string TenGv { get; set; }
        public int? MaMh { get; set; }
        public DateTime? NgaySinh { get; set; }
        public string GioiTinh { get; set; }
        public string DiaChi { get; set; }
        public string SoDt { get; set; }

        public virtual MonHoc MaMhNavigation { get; set; }
        public virtual ICollection<HocSinh> HocSinh { get; set; }
    }
}
