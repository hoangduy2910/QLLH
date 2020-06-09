using System;
using System.Collections.Generic;

namespace QLLH.DAL.Models
{
    public partial class ThoiKhoaBieu
    {
        public int? MaNgay { get; set; }
        public int? MaTiet { get; set; }
        public int? MaMh { get; set; }
        public int? MaGv { get; set; }
        public int? MaLop { get; set; }

        public virtual GiaoVien MaGvNavigation { get; set; }
        public virtual Lop MaLopNavigation { get; set; }
        public virtual MonHoc MaMhNavigation { get; set; }
        public virtual NgayHoc MaNgayNavigation { get; set; }
        public virtual TietHoc MaTietNavigation { get; set; }
    }
}
